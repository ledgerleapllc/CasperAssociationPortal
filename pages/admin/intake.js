import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import DataTable from 'react-data-table-component';

import { LoadingScreen } from '../../components/hoc/loading-screen';
import LayoutDashboard from '../../components/layouts/layout-dashboard';
import { Card } from '../../components/partials';
import { getListIntake } from '../../shared/redux-saga/admin/actions';

const AdminIntake = () => {
  const dispatch = useDispatch();
  const { isLoading, data } = useSelector(state => state?.intakeReducer);

  const columns = useMemo(
    () => [
      {
        name: <div className="text-lg font-medium">Registration Date</div>,
        selector: 'registration_date',
        cell: row => `${row.registration_date}`,
        sortable: false,
        left: true,
      },
      {
        name: <div className="text-lg font-medium">Users Email</div>,
        selector: 'email',
        cell: row => <p className="truncate	">{row.email}</p>,
        sortable: false,
        left: true,
      },
      {
        name: (
          <div className="text-lg font-medium">
            Letter of <br /> Motivation
          </div>
        ),
        selector: 'letter',
        cell: row => (
          <a
            href={`/${row.signed_file_url}`}
            className="pl-3 text-primary cursor-pointer underline"
          >
            View
          </a>
        ),
        sortable: false,
        left: true,
      },
      {
        name: <div className="text-lg font-medium">Node Operator KYC</div>,
        selector: 'register_date',
        cell: row => (
          <button
            type="button"
            className="text-sm text-white w-1/2 h-7 rounded-full bg-primary shadow-md focus:outline-none hover:opacity-40"
          >
            Review
          </button>
        ),
        sortable: false,
        left: true,
      },
      {
        name: <div className="text-lg font-medium">Beneficial Owner KYC</div>,
        selector: 'register_date',
        cell: row => (
          <button
            type="button"
            className="text-sm text-white w-1/2 h-7 rounded-full bg-primary shadow-md focus:outline-none hover:opacity-40"
          >
            Review
          </button>
        ),
        sortable: false,
        left: true,
      },
      {
        name: <div className="text-lg font-medium"># of Beneficial Owners</div>,
        selector: 'register_date',
        cell: row => `${row.beneficial_owners}`,
        sortable: false,
        left: true,
      },
      {
        name: <div className="text-lg font-medium">Unopened Invites</div>,
        selector: 'register_date',
        cell: row => `${row.unopened_invites}`,
        sortable: false,
        left: true,
      },
    ],
    []
  );

  useEffect(() => {
    dispatch(getListIntake({ page: 1, limit: 999 }));
  }, []);

  return (
    <LayoutDashboard>
      <Card className="h-full px-24 py-14">
        <div className="bg-transparent h-full">
          <div className="w-full">
            <div className="lg:h-70px flex flex-col justify-center">
              <h3 className="text-dark2 text-xl lg:pr-32 font-medium mb-3.5">
                Intake
              </h3>
              <p className="text-sm text-gray pb-3.5">
                New members needing approval
              </p>
              <div className="border-primary border-b-2" />
            </div>
          </div>
          <div className="flex flex-col pt-4 h-full">
            <DataTable
              columns={columns}
              data={data?.data || []}
              progressPending={isLoading}
              persistTableHead
              responsive
              noHeader
              fixedHeader
              fixedHeaderScrollHeight="380px"
            />
          </div>
        </div>
      </Card>
    </LayoutDashboard>
  );
};

export default LoadingScreen(AdminIntake, 'final-admin');
