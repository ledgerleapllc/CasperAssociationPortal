import { useEffect, useState } from 'react';
import router from 'next/router';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { LoadingScreen } from '../../../../../components/hoc/loading-screen';
import LayoutDashboard from '../../../../../components/layouts/layout-dashboard';
import { BackButton, Card, Button } from '../../../../../components/partials';
import { getVerificationDetail } from '../../../../../shared/redux-saga/admin/actions';
import Countries from '../../../../../public/json/country.json';
import IconCheck from '../../../../../public/images/ic-feather-check.svg';

const Styles = styled.div`
  .verification-table {
    width: 100%;
    & > tr {
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
  const dispatch = useDispatch();
  const { id } = router.query;

  useEffect(() => {
    dispatch(
      getVerificationDetail({ id }, res => {
        setIntakeDetail(res);
      })
    );
  }, []);

  const getCountry = code => Countries.find(x => x.code === code)?.name;

  const EntityDetail = () => (
    <div>
      <p className="text-sm">
        This is an <b>ENTITY</b>. Please click the link to review the{' '}
        <a className="text-primary cursor-pointer underline">
          uploaded document
        </a>{' '}
        to make sure the name appears in the document. The user has indicated
        this name is on{' '}
        <a className="text-primary cursor-pointer underline">Page 2</a>. If you
        can confirm this, click confirm. If you cannot see the above name in the
        document, click reset. You can log your reason after clicking reset.
      </p>
      <div className="pt-12 actions">
        <Button primary className="mr-5">
          <IconCheck /> <span className="pl-2">Confirm</span>
        </Button>
        <Button primaryOutline>Reset</Button>
      </div>
    </div>
  );

  return (
    <LayoutDashboard>
      <Card className="h-full lg:pl-24 lg:py-11 lg:shadow-2xl" noShadow>
        <div className="w-full h-full">
          <div className="card-header lg:mr-24 lg:h-70px">
            <BackButton href="/admin/intake" text="Cancel" force />
            <h3 className="text-dark2 text-xl lg:pr-32 font-medium mb-3.5">
              IDverification for {intakeDetail?.type}
            </h3>
            <div className="border-primary border-b-2" />
          </div>
          <div className="card-body pt-8 pb-28 overflow-y-auto lg:h-100%-70px">
            <div className="lg:pr-24">
              <p>
                The following information was provided by the user and checked
                for KYC and AML:
              </p>
              <Styles className="pt-12">
                <table className="verification-table border-0">
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
                      <span>Contry:</span>
                    </td>
                    <td>
                      <span>
                        {getCountry(intakeDetail?.profile.country_residence)}
                      </span>
                    </td>
                  </tr>
                </table>
              </Styles>
              <div className="pt-8 pr-44">
                <EntityDetail />
              </div>
            </div>
          </div>
        </div>
      </Card>
    </LayoutDashboard>
  );
};

export default LoadingScreen(AdminIntakeVerificationDetail, 'final-admin');
