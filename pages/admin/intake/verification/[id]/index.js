/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useContext, useEffect, useState } from 'react';
import router from 'next/router';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import Link from 'next/link';
import { LoadingScreen } from '../../../../../components/hoc/loading-screen';
import LayoutDashboard from '../../../../../components/layouts/layout-dashboard';
import { BackButton, Card, Button } from '../../../../../components/partials';
import { AppContext } from '../../../../_app';
import {
  approveDocuments,
  getVerificationDetail,
  resetUserKYC,
  resetIntakeKYC,
} from '../../../../../shared/redux-saga/admin/actions';
import Countries from '../../../../../public/json/country.json';
import IconCheck from '../../../../../public/images/ic-feather-check.svg';
import { formatDate } from '../../../../../shared/core/utils';
import { useDialog } from '../../../../../components/partials/dialog';
import { ResetUserView } from '../../../../../components/admin/intake/dialogs/letter-review';
import IconCopy from '../../../../../public/images/ic_copy.svg';
import { useSnackBar } from '../../../../../components/partials/snack-bar';

const Styles = styled.div`
  .verification-table {
    width: 100%;
    tr {
      td {
        vertical-align: top;
        padding-bottom: 10px;
      }
      td:nth-child(1) {
        width: 20%;
        font-weight: 500;
      }
      td:nth-child(2) {
        width: 75%;
      }
    }
  }
`;

const AdminIntakeVerificationDetail = () => {
  const [intakeDetail, setIntakeDetail] = useState();
  const [representativeDoc, setRepresentativeDoc] = useState();
  const [readUploadDocs, setReadUploadDocs] = useState(false);

  const [confirmationInfoAt, setConfirmationInfoAt] = useState();
  const dispatch = useDispatch();
  const { id } = router.query;
  const { setDialog, onClosed } = useDialog();
  const [loadingConfirmDocs, setLoadingConfirmDocs] = useState();
  const { setLoading } = useContext(AppContext);
  const { openSnack } = useSnackBar();

  useEffect(() => {
    setLoading(true);
    dispatch(
      getVerificationDetail(
        { id },
        res => {
          setLoading(false);
          setIntakeDetail(res);
          setConfirmationInfoAt(res?.profile?.document_verified_at);
          const temp = res?.document_files?.find(
            x => +x.id === +res?.profile?.page_is_representative
          );
          setRepresentativeDoc(temp);
        },
        () => {
          setLoading(false);
        }
      )
    );
  }, []);

  const getCountry = code => Countries.find(x => x.code === code)?.name;

  const readDoc = () => {
    setReadUploadDocs(true);
    intakeDetail.document_files.forEach(file => {
      window.open(`${process.env.BASE_URL}${file.url}`, '_blank');
    });
  };

  const confirmDocs = () => {
    setLoadingConfirmDocs(true);
    dispatch(
      approveDocuments(
        { id },
        () => {
          setConfirmationInfoAt(new Date());
          setLoadingConfirmDocs(false);
        },
        () => {
          setLoadingConfirmDocs(false);
        }
      )
    );
  };

  const doResetUser = () => {
    setDialog({
      type: 'DialogCustom',
      data: {
        content: (
          <ResetUserView
            description="This will reset the KYC step and tell the user through email to submit again for the following reason:"
            onResetUser={message => {
              dispatch(
                resetUserKYC({ id, message }, () => {
                  onClosed();
                })
              );
            }}
            onBack={() => onClosed()}
          />
        ),
      },
    });
  };

  const checkReview = () => {
    window.open('https://backoffice.shuftipro.com/reports', '_blank');
  };

  const clickReset = () => {
    setDialog({
      type: 'DialogCustom',
      data: {
        content: (
          <ResetUserView
            description="This will reset the KYC step and tell the user through email to submit again for the following reason:"
            onResetUser={message => {
              setLoading(true);
              dispatch(
                resetIntakeKYC(
                  { id, message },
                  () => {
                    onClosed();
                    window.location.reload();
                  },
                  () => {
                    onClosed();
                    window.location.reload();
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

  const EntityDetail = () => (
    <div className="pr-44">
      <p className="text-sm">
        This is an <b>ENTITY</b>. Please click the link to review the{' '}
        <a
          className="text-primary cursor-pointer underline"
          onClick={() => readDoc()}
        >
          uploaded document
        </a>{' '}
        to make sure the name appears in the document. The user has indicated
        this name is on{' '}
        <a
          className="text-primary cursor-pointer underline"
          href={`${process.env.BASE_URL}${representativeDoc?.url}`}
          target="_blank"
          rel="noreferrer"
        >
          {representativeDoc?.name}
        </a>
        {intakeDetail &&
        intakeDetail.profile &&
        intakeDetail.profile.page_number
          ? ` and is on page ${intakeDetail.profile.page_number}`
          : null}
        . If you can confirm this, click confirm. If you cannot see the above
        name in the document, click reset. You can log your reason after
        clicking reset.
      </p>
      {!confirmationInfoAt && (
        <div className="pt-12 actions">
          <Button
            primary
            className="mr-5"
            onClick={() => confirmDocs()}
            isLoading={loadingConfirmDocs}
            sizeSpinner={20}
            disabled={!readUploadDocs || loadingConfirmDocs}
          >
            <IconCheck /> <span className="pl-2">Confirm</span>
          </Button>
          <Button
            primaryOutline
            onClick={() => doResetUser()}
            disabled={!readUploadDocs}
          >
            Reset
          </Button>
        </div>
      )}
      {confirmationInfoAt && (
        <>
          <div className="pt-4 text-primary">
            <b>Confirmed in Document:</b>
            <span className="pl-7">
              {`${formatDate(confirmationInfoAt, 'dd/MM/yyyy hh:mm aa')} EST`}
            </span>
          </div>
          <CommonDetail />
        </>
      )}
    </div>
  );

  const renderAMLStatus = () => {
    if (intakeDetail?.shuftipro?.manual_approved_at) {
      return intakeDetail?.shuftipro?.background_checks_result
        ? 'VERIFIED'
        : 'Rejected';
    }
    return intakeDetail?.shuftipro?.background_checks_result
      ? 'VERIFIED'
      : 'Submitted / Pending';
  };

  const renderKYCStatus = () => {
    if (intakeDetail?.shuftipro?.status === 'approved') return 'VERIFIED';
    if (intakeDetail?.shuftipro?.status === 'pending')
      return 'Submitted / Pending';
    if (intakeDetail?.shuftipro?.status === 'denied') return 'Rejected';
    return 'Not Submitted';
  };

  const copyClipboard = () => {
    const copyText = document.getElementById('public-address');
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */
    navigator.clipboard.writeText(copyText.value);
    openSnack('primary', 'Copied Public Address!');
  };

  const CommonDetail = () => (
    <div className="pt-8">
      <div className="mb-12 w-14 border-b border-primary" />
      <p className="text-sm">The KYC/AML provider returned the following:</p>
      <Styles className="pt-12">
        <table className="verification-table border-0">
          <tbody>
            <tr>
              <td>
                <span>AML Status:</span>
              </td>
              <td>
                <span>{renderAMLStatus()}</span>
              </td>
            </tr>
            <tr>
              <td>
                <span>KYC Status:</span>
              </td>
              <td>
                <span>{renderKYCStatus()}</span>
              </td>
            </tr>
            <tr>
              <td>
                <span>Reference Number:</span>
              </td>
              <td>
                <div className="flex">
                  <span>{intakeDetail?.shuftipro?.reference_id}</span>
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
                  value={intakeDetail?.shuftipro?.reference_id}
                  readOnly
                  hidden
                />
              </td>
            </tr>
          </tbody>
        </table>
      </Styles>
      <div className="pt-12 actions">
        {intakeDetail?.shuftipro &&
        intakeDetail?.shuftipro.id &&
        (!intakeDetail?.shuftipro?.background_checks_result ||
          intakeDetail?.shuftipro?.status !== 'approved') ? (
          <>
            <Button primary className="mr-5" onClick={() => checkReview()}>
              Begin Review
            </Button>
            <Button primary className="mr-5" onClick={() => clickReset()}>
              Reset KYC
            </Button>
            {intakeDetail?.profile?.type === 'entity' ? (
              <Button
                primaryOutline
                onClick={() => setConfirmationInfoAt(null)}
              >
                Go Back
              </Button>
            ) : (
              <Link href="/admin/intake">
                <a>
                  <Button primaryOutline>Go Back</Button>
                </a>
              </Link>
            )}
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );

  return (
    <LayoutDashboard>
      <Card className="h-full lg:pl-card lg:py-5 lg:shadow-2xl" noShadow>
        <div className="flex flex-col w-full h-full">
          <div className="card-header lg:mr-card border-primary border-b-2">
            <div className="h-11 mb-3">
              <BackButton href="/admin/intake" text="Back" force />
              <h3 className="text-dark2 text-xl font-medium">
                ID verification for{' '}
                <span className="pl-1 capitalize">
                  {intakeDetail?.profile?.type}
                </span>
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
                        <span>First Name:</span>
                      </td>
                      <td>
                        <span>{intakeDetail?.first_name}</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span>Last Name:</span>
                      </td>
                      <td>
                        <span>{intakeDetail?.last_name}</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span>Date of Birth:</span>
                      </td>
                      <td>
                        <span>{intakeDetail?.profile?.dob}</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span>Country:</span>
                      </td>
                      <td>
                        <span>
                          {getCountry(
                            intakeDetail?.profile?.country_citizenship
                          )}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Styles>
              <div>
                {intakeDetail?.profile?.type === 'entity' && <EntityDetail />}
                {intakeDetail?.profile?.type === 'individual' && (
                  <CommonDetail />
                )}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </LayoutDashboard>
  );
};

export default LoadingScreen(
  AdminIntakeVerificationDetail,
  'final-admin',
  'intake'
);
