import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import LayoutDashboard from '../../../../components/layouts/layout-dashboard';
import { Card } from '../../../../components/partials';

const KycAmlDetail = ({ userId }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  return (
    <LayoutDashboard>
      <Card className="h-full px-24 py-14">
        <div className="bg-transparent h-full">
          <div className="w-full">
            <div className="lg:h-70px flex flex-col justify-center">
              <button
                type="button"
                className="flex items-center w-max focus:outline-none mb-5"
                onClick={() => router.push(`/admin/users/${userId}`)}
              >
                <img
                  src="/images/ic_prev_circle.svg"
                  alt="prev"
                  width="18"
                  height="18"
                  className="mr-2"
                />
                <span className="text-primary text-sm">Back</span>
              </button>
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
                    className="text-lg text-white px-9 h-11 rounded-full bg-primary shadow-md focus:outline-none hover:opacity-40"
                  >
                    Manually Approve
                  </button>
                  <button
                    type="button"
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
                <p className="text-sm w-5/6">James</p>
              </div>
              <div className="flex flex-row py-1">
                <p className="text-sm font-medium w-1/6">Last Name:</p>
                <p className="text-sm w-5/6">Stone</p>
              </div>
              <div className="flex flex-row py-1">
                <p className="text-sm font-medium w-1/6">DOB:</p>
                <p className="text-sm w-5/6">05/05/1985</p>
              </div>
              <div className="flex flex-row py-1">
                <p className="text-sm font-medium w-1/6">
                  Country of Citizenship:
                </p>
                <p className="text-sm w-5/6">Australia</p>
              </div>
              <div className="flex flex-row py-1">
                <p className="text-sm font-medium w-1/6">Street Address:</p>
                <p className="text-sm w-5/6">123 Street Way</p>
              </div>
              <div className="flex flex-row py-1">
                <p className="text-sm font-medium w-1/6">City:</p>
                <p className="text-sm w-5/6">Newtown</p>
              </div>
              <div className="flex flex-row py-1">
                <p className="text-sm font-medium w-1/6">Postal Code:</p>
                <p className="text-sm w-5/6">98765</p>
              </div>
              <div className="flex flex-row py-1">
                <p className="text-sm font-medium w-1/6">
                  Country of Residence:
                </p>
                <p className="text-sm w-5/6">Australia</p>
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

export const getServerSideProps = async context => {
  try {
    const userId = context.query.id;
    return { props: { userId } };
  } catch (err) {
    return { props: { errors: err.message } };
  }
};
