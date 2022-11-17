import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingScreen } from '../../../components/hoc/loading-screen';
import LayoutDashboard from '../../../components/layouts/layout-dashboard';
import { BackButton, Button, Card } from '../../../components/partials';
import ActiveBallot from '../../../components/dashboard/ballots/detail/active-ballot';
import { MakeVote } from '../../../components/dashboard/ballots/dialogs/make-vote';
import CompleteBallot from '../../../components/dashboard/ballots/detail/complete-ballot';
import { withPageRestricted } from '../../../components/hoc/with-page-restricted';
import { AppContext } from '../../../pages/_app';
import {
  getVoteDetail,
  getVoteStatus,
  viewedAttachDocument,
} from '../../../shared/redux-saga/dashboard/dashboard-actions';
import { useDialog } from '../../../components/partials/dialog';
import { useSnackBar } from '../../../components/partials/snack-bar';
import { getDateObject } from '../../../shared/core/utils';

const UserActiveBallot = ({ ballot, userVote, onReload }) => {
  const { setDialog } = useDialog();
  const [files, setFiles] = useState();
  const [voteStatus, setVoteStatus] = useState({});
  const { openSnack } = useSnackBar();
  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.authReducer.userInfo.fullInfo);

  useEffect(() => {
    setFiles(ballot.files);
  }, [ballot]);

  useEffect(() => {
    if (
      userInfo &&
      Object.keys(userInfo).length > 0 &&
      !['admin', 'sub-admin'].includes(userInfo?.role)
    ) {
      dispatch(
        getVoteStatus(
          res => {
            setVoteStatus(res);
          },
          () => {}
        )
      );
    }
  }, [userInfo]);

  const doVote = () => {
    if (ballot.time_begin) {
      const date = getDateObject(ballot.time_begin);
      if (date && date.getTime() > new Date().getTime()) {
        openSnack('primary', 'You cannot vote before the vote start datetime');
        return;
      }
    }
    const checkViewed = files.every(x => x.is_viewed);
    if (!checkViewed) {
      openSnack(
        'primary',
        'You must view the attached documentation before voting.'
      );
    } else {
      setDialog({
        type: 'DialogCustom',
        data: {
          content: <MakeVote id={ballot.id} onReload={onReload} />,
        },
      });
    }
  };

  const viewdFile = useCallback(
    file => {
      dispatch(
        viewedAttachDocument(file, () => {
          const fileTemp = files.find(x => x.id === file.id);
          fileTemp.is_viewed = 1;
          setFiles([...files]);
        })
      );
    },
    [files]
  );

  return (
    <div className="flex flex-col h-full">
      <div className="card-header lg:mr-card border-primary border-b-2">
        <div className="flex justify-between items-center mb-3">
          <div className="h-11 flex items-end">
            <BackButton href="/dashboard/votes" text="Back" force />
          </div>
          <div>
            {!userVote &&
              !['admin', 'sub-admin'].includes(userInfo?.role) &&
              voteStatus &&
              voteStatus.can_vote && (
                <Button primary onClick={doVote}>
                  Submit a Vote
                </Button>
              )}
            {userVote && (
              <p>
                My Vote:
                <span className="font-medium pl-2 text-primary capitalize">
                  {userVote.type}
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="card-body pt-8 overflow-y-auto flex-1 min-h-0">
        <ActiveBallot ballot={ballot} onViewedFile={viewdFile} />
      </div>
    </div>
  );
};

const UserCompleteBallot = ({ ballot }) => (
  <div className="h-full flex flex-col">
    <div className="card-header lg:mr-card border-primary border-b-2">
      <div className="flex justify-between items-center mb-3">
        <div className="h-11 flex items-end">
          <BackButton href="/dashboard/votes" text="Back" force />
        </div>
      </div>
    </div>
    <div className="card-body pt-8 overflow-y-auto flex-1 min-h-0">
      <CompleteBallot ballot={ballot} />
    </div>
  </div>
);

const UserVoteDetail = () => {
  const [voting, setVoting] = useState();
  const [userVote, setUserVote] = useState();
  const routerParams = useParams();
  const { id } = routerParams;
  const dispatch = useDispatch();
  const { setLoading } = useContext(AppContext);

  const fetchVoteDetail = () => {
    setLoading(true);
    dispatch(
      getVoteDetail(
        id,
        res => {
          setVoting(res);
          setLoading(false);
          setUserVote(res.user_vote);
        },
        () => {
          setLoading(false);
        }
      )
    );
  };

  useEffect(() => {
    if (id) {
      fetchVoteDetail();
    }
  }, [id]);

  return (
    <LayoutDashboard>
      <Card className="h-full lg:pl-card lg:py-5 lg:shadow-2xl" noShadow>
        <div className="w-full h-full">
          {voting && voting.status === 'active' && (
            <UserActiveBallot
              ballot={voting}
              userVote={userVote}
              onReload={fetchVoteDetail}
            />
          )}
          {voting && voting.status !== 'active' && (
            <UserCompleteBallot ballot={voting} />
          )}
        </div>
      </Card>
    </LayoutDashboard>
  );
};

export default LoadingScreen(
  withPageRestricted(UserVoteDetail, 'votes'),
  'final-all'
);
