import router from 'next/router';
import Link from 'next/link';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useContext, useEffect, useState } from 'react';
import { LoadingScreen } from '../../../../../components/hoc/loading-screen';
import LayoutDashboard from '../../../../../components/layouts/layout-dashboard';
import { BackButton, Card, Button } from '../../../../../components/partials';
import { useDialog } from '../../../../../components/partials/dialog';
import {
  BanUserView,
  ResetUserView,
} from '../../../../../components/admin/intake/dialogs/letter-review';
import { AdminVerifiedCompletion } from '../../../../../components/admin/intake/dialogs/admin-verified-completion';
import {
  approveUserKYC,
  banVerifiedUser,
  resetUserKYC,
  getVerificationDetail,
} from '../../../../../shared/redux-saga/admin/actions';
import { AppContext } from '../../../../_app';

const Styles = styled.div`
  .verification-table {
    width: 68%;
    & > tr {
      td {
        vertical-align: top;
        padding-bottom: 1.8rem;
      }
      &:last-child {
        td {
          padding-bottom: 0;
        }
      }
      td:nth-child(1) {
        width: 30%;
        font-weight: 500;
      }
      td:nth-child(2) {
        width: 70%;
      }
    }
  }
`;

const AdminIntakeVerificationKYC = () => {
  const { id } = router.query;
  const { setDialog, onClosed } = useDialog();
  const dispatch = useDispatch();
  const [loadingApproved, setLoadingApproved] = useState(false);
  const { setLoading } = useContext(AppContext);
  const [shuftiData, setShuftiData] = useState();

  useEffect(() => {
    setLoading(true);
    dispatch(
      getVerificationDetail(
        { id },
        res => {
          setLoading(false);
          setShuftiData(JSON.parse(res.shuftipro?.data));
        },
        () => {
          setLoading(false);
        }
      )
    );
  }, []);

  const doBanKYCUser = () => {
    setDialog({
      type: 'DialogCustom',
      data: {
        content: (
          <BanUserView
            onBanUser={() => {
              setLoading(true);
              dispatch(
                banVerifiedUser(
                  { id },
                  res => {
                    console.log(res);
                    router.push('../../');
                    onClosed();
                    setLoading(false);
                  },
                  () => {
                    setLoading(false);
                  }
                )
              );
            }}
            onBack={() => onClosed()}
          />
        ),
      },
    });
  };

  const doResetKYCUser = () => {
    setDialog({
      type: 'DialogCustom',
      data: {
        content: (
          <ResetUserView
            description="This will reset the AML step and tell the user through email to submit again for the following reason:"
            onResetUser={message => {
              setLoading(true);
              dispatch(
                resetUserKYC(
                  { id, message },
                  res => {
                    console.log(res);
                    router.push('../../');
                    onClosed();
                    setLoading(false);
                  },
                  () => {
                    setLoading(false);
                  }
                )
              );
            }}
            onBack={() => onClosed()}
          />
        ),
      },
    });
  };

  const approveKYCUser = () => {
    setLoadingApproved(true);
    dispatch(
      approveUserKYC(
        { id },
        res => {
          console.log(res);
          setLoadingApproved(false);
          setDialog({
            type: 'DialogCustom',
            data: {
              content: (
                <AdminVerifiedCompletion
                  onNext={() => {
                    router.push(`../${id}`);
                    onClosed();
                  }}
                />
              ),
            },
          });
        },
        () => {
          setLoadingApproved(false);
        }
      )
    );
  };

  return (
    <LayoutDashboard>
      <Card className="h-full lg:pl-card lg:py-11 lg:shadow-2xl" noShadow>
        <div className="w-full h-full">
          <div className="card-header lg:mr-card lg:h-70px">
            <BackButton href="/admin/intake" text="Back" force />
            <h3 className="text-dark2 text-xl lg:pr-32 font-medium mb-3.5">
              KYC Review
            </h3>
            <div className="border-primary border-b-2" />
          </div>
          <div className="card-body pt-8 pb-28 overflow-y-auto lg:h-100%-70px">
            <div className="lg:pr-card">
              <p>The following was returned from the API provider:</p>
              <Styles className="pt-12">
                <table className="verification-table border-0">
                  <tr>
                    <td>
                      <span>Response:</span>
                    </td>
                    <td>
                      <span>{shuftiData?.declined_reason}</span>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="2">
                      <span className="font-normal">
                        Please check with the KYC provider regarding why the
                        document was not auto-approved and select an option
                        below
                      </span>
                    </td>
                  </tr>
                </table>
              </Styles>
              <div className="pt-12 actions">
                <Button
                  primary
                  isLoading={loadingApproved}
                  disabled={loadingApproved}
                  sizeSpinner={20}
                  onClick={approveKYCUser}
                >
                  Approve Manually
                </Button>
                <div className="pt-7 flex gap-5">
                  <Button primaryOutline onClick={doBanKYCUser}>
                    Deny & Ban
                  </Button>
                  <Button primaryOutline onClick={doResetKYCUser}>
                    Reset With Reason
                  </Button>
                  <Link href={`../${id}`}>
                    <a>
                      <Button primaryOutline>Pause for Now</Button>
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </LayoutDashboard>
  );
};

export default LoadingScreen(AdminIntakeVerificationKYC, 'final-admin');
