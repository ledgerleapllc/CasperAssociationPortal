import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { useContext, useEffect, useState } from 'react';
import LayoutDashboard from '../../../../components/layouts/layout-dashboard';
import { Card, BackButton } from '../../../../components/partials';
import { getVerificationDetail } from '../../../../shared/redux-saga/admin/actions';
import Countries from '../../../../public/json/country.json';
import { AppContext } from '../../../_app';
import { LoadingScreen } from '../../../../components/hoc/loading-screen';

const KycAmlDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const { setLoading } = useContext(AppContext);
  const [userKYC, setUserKYC] = useState();

  useEffect(() => {
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
  }, []);

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
            {/* User Info */}
            <div className="flex flex-col pb-7 border-b border-gray">
              <p className="text-base font-medium pb-5">
                Information Submitted to API
              </p>
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
                <p className="text-sm w-5/6">{userKYC?.profile?.dob}</p>
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
            </div>
            {/* AML API */}
            <div className="flex flex-col py-7 border-b border-gray">
              <p className="text-base font-medium pb-5">AML API</p>
              <div className="flex flex-row py-1">
                <p className="text-sm font-medium w-1/6">
                  Timestamp of Last Run:
                </p>
                <p className="text-sm w-5/6">23/07/2021 - 8:51PM</p>
              </div>
              <div className="flex flex-row py-1">
                <p className="text-sm font-medium w-1/6">API Response:</p>
                <p className="text-sm w-5/6">{`{response}`}</p>
              </div>
              <div className="flex flex-row py-1">
                <p className="text-sm font-medium w-1/6">Additional Notes:</p>
                <p className="text-sm w-5/6">{`{notes}`}</p>
              </div>
            </div>
            {/* ID Documment API */}
            <div className="flex flex-col py-7 border-b border-gray">
              <p className="text-base font-medium pb-5">ID Document API</p>
              <div className="flex flex-col pb-5">
                <div className="flex flex-row py-1">
                  <p className="text-sm font-medium w-1/6">
                    Timestamp of Last Run:
                  </p>
                  <p className="text-sm w-5/6">23/07/2021 - 8:55PM</p>
                </div>
                <div className="flex flex-row py-1">
                  <p className="text-sm font-medium w-1/6">API Response:</p>
                  <p className="text-sm w-5/6">{`{response}`}</p>
                </div>
                <div className="flex flex-row py-1">
                  <p className="text-sm font-medium w-1/6">Additional Notes:</p>
                  <p className="text-sm w-5/6">{`{notes}`}</p>
                </div>
              </div>
            </div>
            {/* Address Documment API */}
            <div className="flex flex-col py-7">
              <p className="text-base font-medium pb-5">Address Document API</p>
              <div className="flex flex-col pb-5">
                <div className="flex flex-row py-1">
                  <p className="text-sm font-medium w-1/6">
                    Timestamp of Last Run:
                  </p>
                  <p className="text-sm w-5/6">23/07/2021 - 9:01PM</p>
                </div>
                <div className="flex flex-row py-1">
                  <p className="text-sm font-medium w-1/6">API Response:</p>
                  <p className="text-sm w-5/6">{`{response}`}</p>
                </div>
                <div className="flex flex-row py-1">
                  <p className="text-sm font-medium w-1/6">Additional Notes:</p>
                  <p className="text-sm w-5/6">{`{notes}`}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </LayoutDashboard>
  );
};

export default LoadingScreen(KycAmlDetail, 'final-admin');
