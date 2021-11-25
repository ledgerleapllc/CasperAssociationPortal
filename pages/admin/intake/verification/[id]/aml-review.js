/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-unused-vars */
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
import {
  resetUserAML,
  banVerifiedUser,
  approveUserAML,
  getVerificationDetail,
  refreshLinks,
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

const AdminIntakeVerificationAML = () => {
  const { id } = router.query;
  const { setDialog, onClosed } = useDialog();
  const dispatch = useDispatch();
  const [loadingApproved, setLoadingApproved] = useState(false);
  const { setLoading } = useContext(AppContext);
  const [shuftiData, setShuftiData] = useState();
  const [shuftipro, setShuftipro] = useState();

  const refreshUser = () => {
    dispatch(
      getVerificationDetail(
        { id },
        res => {
          setLoading(false);
          if (res.shuftipro.background_checks_result === 1) {
            router.push(`/admin/intake/verification/${id}/kyc-review`);
          } else {
            setShuftiData(JSON.parse(res.shuftipro?.data));
            setShuftipro(res.shuftipro);
          }
        },
        () => {
          setLoading(false);
        }
      )
    );
  };

  useEffect(() => {
    setLoading(true);
    refreshUser();
  }, []);

  const doBanAMLUser = () => {
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

  const doApproveAMLUser = () => {
    setLoadingApproved(true);
    dispatch(
      approveUserAML(
        { id },
        () => {
          router.push(`/admin/intake/verification/${id}/kyc-review`);
          setLoadingApproved(false);
        },
        () => {
          setLoadingApproved(false);
        }
      )
    );
  };

  const doResetAMLUser = () => {
    setDialog({
      type: 'DialogCustom',
      data: {
        content: (
          <ResetUserView
            description="This will reset the AML step and tell the user through email to submit again for the following reason:"
            onResetUser={message => {
              setLoading(true);
              dispatch(
                resetUserAML(
                  { id, message },
                  res => {
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

  const refreshLink = e => {
    e.preventDefault();
    setLoading(true);
    dispatch(
      refreshLinks(
        { userId: id },
        () => {
          setLoading(false);
          refreshUser();
        },
        () => {
          setLoading(false);
        }
      )
    );
  };

  return (
    <LayoutDashboard>
      <Card className="h-full lg:pl-card lg:py-5 lg:shadow-2xl" noShadow>
        <div className="flex flex-col w-full h-full">
          <div className="card-header lg:mr-card border-primary border-b-2">
            <div className="h-11 mb-3">
              <BackButton href="/admin/intake" text="Back" force />
              <h3 className="text-dark2 text-xl lg:pr-32 font-medium">
                AML Review
              </h3>
            </div>
          </div>
          <div className="flex-1 min-h-0 card-body pt-8 overflow-y-auto">
            <div className="lg:pr-card">
              <p>
                The following information was provided by the user and checked
                for KYC and AML:
              </p>
              <Styles className="pt-12">
                <table className="verification-table border-0">
                  <tbody>
                    <tr>
                      <td>
                        <div className="flex" style={{ padding: '5px 0' }}>
                          <span style={{ width: '170px' }}>Response:</span>
                          <span>
                            {shuftiData?.aml_declined_reason ||
                              'Unknown Reason'}
                          </span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p className="flex" style={{ padding: '5px 0' }}>
                          <span style={{ width: '170px' }}>
                            Identification Doc:
                          </span>
                          <a
                            target="_blank"
                            rel="noreferrer"
                            href={shuftipro?.document_proof}
                            style={{
                              textDecoration: 'underline',
                              color: 'red',
                            }}
                          >
                            View
                          </a>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p className="flex" style={{ padding: '5px 0' }}>
                          <span style={{ width: '170px' }}>Address Doc:</span>
                          <a
                            target="_blank"
                            rel="noreferrer"
                            href={shuftipro?.address_proof}
                            style={{
                              textDecoration: 'underline',
                              color: 'red',
                            }}
                          >
                            View
                          </a>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p className="flex" style={{ padding: '5px 0' }}>
                          <span style={{ width: '170px' }}>
                            Expired proof links?
                          </span>
                          <a
                            onClick={refreshLink}
                            style={{
                              textDecoration: 'underline',
                              color: 'red',
                            }}
                          >
                            Refresh
                          </a>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td>&nbsp;</td>
                    </tr>
                    <tr>
                      <td>
                        <span className="font-normal">
                          Please verify with the user that the flagged account{' '}
                          is not them before allowing this person to have a{' '}
                          Verified account.
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
                  onClick={doApproveAMLUser}
                >
                  Approve Manually
                </Button>
                <Button primaryOutline onClick={doResetAMLUser}>
                  Reset With Reason
                </Button>
                <Button primaryOutline onClick={doBanAMLUser}>
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
  AdminIntakeVerificationAML,
  'final-admin',
  'intake'
);
