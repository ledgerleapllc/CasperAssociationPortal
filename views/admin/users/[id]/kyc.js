import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useContext, useEffect, useState } from 'react';
import LayoutDashboard from '../../../../components/layouts/layout-dashboard';
import { Card, BackButton } from '../../../../components/partials';
import { getVerificationDetail } from '../../../../shared/redux-saga/admin/actions';
import Countries from '../../../../public/json/country.json';
import { AppContext } from '../../../../pages/_app';
import { LoadingScreen } from '../../../../components/hoc/loading-screen';
import IconCopy from '../../../../public/images/ic_copy.svg';
import { useSnackBar } from '../../../../components/partials/snack-bar';

const KycAmlDetail = () => {
  const routerParams = useParams();
  const { id } = routerParams;
  const dispatch = useDispatch();
  const { setLoading } = useContext(AppContext);
  const [userKYC, setUserKYC] = useState();
  const { openSnack } = useSnackBar();

  const refreshData = () => {
    setLoading(true);
    dispatch(
      getVerificationDetail(
        { id },
        res => {
          setLoading(false);
          setUserKYC(res);
        },
        () => {
          setLoading(false);
        }
      )
    );
  };

  useEffect(() => {
    refreshData();
  }, []);

  const renderAddressCheckStatus = () => {
    if (userKYC && userKYC?.shuftipro && userKYC?.shuftipro?.id) {
      const { address_result, status } = userKYC?.shuftipro;

      if (status === 'approved' && !address_result) {
        return 'Manually approved';
      }

      if (status === 'denied' && !address_result) {
        return 'Manually denied';
      }

      if (address_result == null) {
        return 'Submitted / Pending';
      }

      if (address_result) {
        return 'VERIFIED';
      }
    }
    return 'Rejected';
  };

  const renderIDCheckStatus = () => {
    if (userKYC && userKYC?.shuftipro && userKYC?.shuftipro?.id) {
      const { document_result, status } = userKYC?.shuftipro;

      if (status === 'approved' && !document_result) {
        return 'Manually approved';
      }

      if (status === 'denied' && !document_result) {
        return 'Manually denied';
      }

      if (document_result == null) {
        return 'Submitted / Pending';
      }

      if (document_result) {
        return 'VERIFIED';
      }
    }
    return 'Rejected';
  };

  const renderAPIResponse = () => {
    if (userKYC && userKYC?.shuftipro && userKYC?.shuftipro?.id) {
      if (userKYC?.shuftipro?.status === 'approved') return 'VERIFIED';
      if (userKYC?.shuftipro?.status === 'pending')
        return 'Submitted / Pending';
      if (userKYC?.shuftipro?.status === 'denied') return 'Rejected';
    }
    return 'Not Submitted';
  };

  const copyClipboard = () => {
    const copyText = document.getElementById('public-address');
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyText.value);
    openSnack('primary', 'Copied Public Address!');
  };

  return (
    <LayoutDashboard>
      <Card className="h-full px-card py-5">
        <div className="flex flex-col bg-transparent h-full">
          <div className="w-full">
            <div className="flex flex-col justify-center border-primary border-b-2">
              <div className="flex flex-col">
                <BackButton href={`/admin/users/${id}`} text="Back" force />
                <h3 className="text-dark2 text-xl lg:pr-32 font-medium mb-1">
                  Node Operator KYC/AML Details
                </h3>
                <p className="text-sm text-gray pb-3">
                  Submitted by membership applicant review
                </p>
              </div>
            </div>
          </div>
          <div className="flex-1 min-h-0 flex flex-col pt-8 overflow-y-scroll padding-tracker">
            <div className="flex flex-col pb-7 border-b border-gray">
              <p className="text-base font-medium pb-5">AML/Background</p>
              <div className="flex flex-row py-1">
                <p className="text-sm font-medium w-1/6">Fist Name:</p>
                <p className="text-sm w-5/6">{userKYC?.profile?.first_name}</p>
              </div>
              <div className="flex flex-row py-1">
                <p className="text-sm font-medium w-1/6">Last Name:</p>
                <p className="text-sm w-5/6">{userKYC?.profile?.last_name}</p>
              </div>
              <div className="flex flex-row py-1">
                <p className="text-sm font-medium w-1/6">DOB:</p>
                <p className="text-sm w-5/6">*</p>
              </div>
              <div className="flex flex-row py-1">
                <p className="text-sm font-medium w-1/6">
                  Country of Citizenship:
                </p>
                <p className="text-sm w-5/6">
                  {
                    Countries.find(
                      country =>
                        country.code === userKYC?.profile?.country_citizenship
                    )?.name
                  }
                </p>
              </div>
              <div className="flex flex-row py-1">
                <p className="text-sm font-medium w-1/6">Street Address:</p>
                <p className="text-sm w-5/6">{userKYC?.profile?.address}</p>
              </div>
              <div className="flex flex-row py-1">
                <p className="text-sm font-medium w-1/6">City:</p>
                <p className="text-sm w-5/6">{userKYC?.profile?.city}</p>
              </div>
              <div className="flex flex-row py-1">
                <p className="text-sm font-medium w-1/6">Postal Code:</p>
                <p className="text-sm w-5/6">{userKYC?.profile?.zip}</p>
              </div>
              <div className="flex flex-row py-1">
                <p className="text-sm font-medium w-1/6">
                  Country of Residence:
                </p>
                <p className="text-sm w-5/6">
                  {
                    Countries.find(
                      country =>
                        country.code === userKYC?.profile?.country_residence
                    )?.name
                  }
                </p>
              </div>
              <div className="flex flex-row py-1">
                <p className="text-sm font-medium w-1/6">API Response:</p>
                <p className="text-sm w-5/6">{renderAPIResponse()}</p>
              </div>
            </div>
            <div className="flex flex-col py-7">
              <p className="text-base font-medium pb-5">Document Submission</p>
              <div className="flex flex-col pb-5">
                <div className="flex flex-row py-1">
                  <p className="text-sm font-medium w-1/6">Reference Number:</p>
                  <div className="text-sm w-5/6">
                    <div className="flex">
                      <span>{userKYC?.shuftipro?.reference_id}</span>
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
                      value={userKYC?.shuftipro?.reference_id ?? ''}
                      readOnly
                      hidden
                    />
                  </div>
                </div>
                <div className="flex flex-row py-1">
                  <p className="text-sm font-medium w-1/6">ID Check Status:</p>
                  <p className="text-sm w-5/6">{renderIDCheckStatus()}</p>
                </div>
                <div className="flex flex-row py-1">
                  <p className="text-sm font-medium w-1/6">
                    Address Check Status:
                  </p>
                  <p className="text-sm w-5/6">{renderAddressCheckStatus()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </LayoutDashboard>
  );
};

export default LoadingScreen(KycAmlDetail, 'final-admin', 'users');
