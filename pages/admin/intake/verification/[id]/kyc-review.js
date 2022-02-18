import router from 'next/router';
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
import IconCopy from '../../../../../public/images/ic_copy.svg';
import { useSnackBar } from '../../../../../components/partials/snack-bar';

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
  // const [shuftiData, setShuftiData] = useState();
  const [shuftipro, setShuftipro] = useState();
  const { openSnack } = useSnackBar();

  const refreshUser = () => {
    setLoading(true);
    dispatch(
      getVerificationDetail(
        { id },
        res => {
          setLoading(false);
          setShuftipro(res.shuftipro);
        },
        () => {
          setLoading(false);
        }
      )
    );
  };

  useEffect(() => {
    refreshUser();
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
                  () => {
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
                  () => {
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
        () => {
          setLoadingApproved(false);
          setDialog({
            type: 'DialogCustom',
            data: {
              content: (
                <AdminVerifiedCompletion
                  onNext={() => {
                    router.push(`/admin/intake/verification/${id}`);
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

  const renderResponse = () => {
    if (shuftipro && shuftipro.id) {
      if (shuftipro?.status === 'approved') return 'VERIFIED';
      if (shuftipro?.status === 'pending') return 'Submitted / Pending';
      if (shuftipro?.status === 'denied') return 'Rejected';
    }
    return 'Not Submitted';
  };

  const copyClipboard = () => {
    const copyText = document.getElementById('public-address');
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */
    navigator.clipboard.writeText(copyText.value);
    openSnack('primary', 'Copied Public Address!');
  };

  return (
    <LayoutDashboard>
      <Card className="h-full lg:pl-card lg:py-5 lg:shadow-2xl" noShadow>
        <div className="flex flex-col w-full h-full">
          <div className="card-header lg:mr-card border-primary border-b-2">
            <div className="h-11 mb-3">
              <BackButton href="/admin/intake" text="Back" force />
              <h3 className="text-dark2 text-xl font-medium">KYC Review</h3>
            </div>
          </div>
          <div className="card-body pt-8 flex-1 min-h-0 overflow-y-auto">
            <div className="lg:pr-card">
              <p>The following was returned from the API provider:</p>
              <Styles className="pt-12">
                <table className="verification-table border-0">
                  <tbody>
                    <tr>
                      <td>
                        <p className="flex" style={{ padding: '5px 0' }}>
                          <span style={{ width: '170px' }}>
                            Reference Number:
                          </span>
                          <div className="flex">
                            <span>{shuftipro?.reference_id}</span>
                            <button
                              className="ml-6"
                              type="button"
                              onClick={() => copyClipboard()}
                            >
                              <IconCopy />
                            </button>
                          </div>
                          <input
                            id="public-address"
                            value={shuftipro?.reference_id || ''}
                            readOnly
                            hidden
                          />
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p className="flex" style={{ padding: '5px 0' }}>
                          <span style={{ width: '170px' }}>
                            ID Check Status:
                          </span>
                          <span>{renderResponse()}</span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td>&nbsp;</td>
                    </tr>
                    <tr>
                      <td>
                        <span className="font-normal">
                          Please check with the KYC provider regarding why the
                          document was not auto-approved and select an option
                          below
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Styles>
              <div className="pt-12 flex gap-5 actions">
                <Button
                  primary
                  isLoading={loadingApproved}
                  disabled={loadingApproved}
                  sizeSpinner={20}
                  onClick={approveKYCUser}
                >
                  Approve Manually
                </Button>
                <Button primaryOutline onClick={doResetKYCUser}>
                  Reset With Reason
                </Button>
                <Button primaryOutline onClick={doBanKYCUser}>
                  Deny &amp; Ban
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </LayoutDashboard>
  );
};

export default LoadingScreen(
  AdminIntakeVerificationKYC,
  'final-admin',
  'intake'
);
