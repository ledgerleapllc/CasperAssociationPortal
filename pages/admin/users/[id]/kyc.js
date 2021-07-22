import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import LayoutDashboard from '../../../../components/layouts/layout-dashboard';
import { Card, BackButton } from '../../../../components/partials';
import {
  getUserKYCInfo,
  approveKYC,
  denyKYC,
} from '../../../../shared/redux-saga/admin/actions';
import Countries from '../../../../public/json/country.json';
import { useDialog } from '../../../../components/partials/dialog';

const KycAmlDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const userKYC = useSelector(state => state.userKYCInfoReducer.data);
  useEffect(() => {
    if (id) {
      dispatch(getUserKYCInfo(id));
    }
  }, [id]);
  const { setDialog } = useDialog();
  const onHandleApproved = idUser => {
    setDialog({
      type: 'DialogConfirm',
      data: {
        title: '',
        content: 'Are you sure you want to approve this user',
        ok: 'Yes, Please continue',
        cancel: 'Cancel',
      },
      afterClosed: res => {
        if (res) {
          dispatch(approveKYC(idUser));
        }
      },
    });
  };

  const onHandleDeny = idUser => {
    setDialog({
      type: 'DialogConfirm',
      data: {
        title: '',
        content: 'Are you sure you want to deny this user',
        ok: 'Yes, Please continue',
        cancel: 'Cancel',
      },
      afterClosed: res => {
        if (res) {
          dispatch(denyKYC(idUser));
        }
      },
    });
  };

  return (
    <LayoutDashboard>
      <Card className="h-full px-24 py-14">
        <div className="bg-transparent h-full">
          <div className="w-full">
            <div className="lg:h-70px flex flex-col justify-center">
              <BackButton href={`/admin/users/${id}`} text="Back" force />
              <div className="flex flex-row justify-between items-center">
                <div className="flex flex-col">
                  <h3 className="text-dark2 text-xl lg:pr-32 font-medium mb-3.5">
                    Node Operator KYC/AML Details
                  </h3>
                  <p className="text-sm text-gray pb-3.5">
                    Submitted by membership applicant review
                  </p>
                </div>
                <div className="flex flex-row space-x-2">
                  <button
                    type="button"
                    onClick={() => onHandleApproved(id)}
                    className="text-lg text-white px-9 h-11 rounded-full bg-primary shadow-md focus:outline-none hover:opacity-40"
                  >
                    Manually Approve
                  </button>
                  <button
                    type="button"
                    onClick={() => onHandleDeny(id)}
                    className="text-lg text-white px-9 h-11 rounded-full bg-primary shadow-md focus:outline-none hover:opacity-40"
                  >
                    Manually Deny
                  </button>
                  <button
                    type="button"
                    className="text-lg text-white px-9 h-11 rounded-full bg-primary shadow-md focus:outline-none hover:opacity-40"
                  >
                    Reset
                  </button>
                </div>
              </div>
              <div className="border-primary border-b-2" />
            </div>
          </div>
          <div className="flex flex-col mt-6 h-5/6 overflow-y-scroll">
            {/* User Info */}
            <div className="flex flex-col py-7 border-b border-gray">
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

export default KycAmlDetail;
