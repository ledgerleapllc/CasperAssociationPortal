import styled from 'styled-components';
import Link from 'next/link';
import { BackButton, StatusText, ForAgainst } from '../../../partials';
import { formatDate } from '../../../../shared/core/utils';

const Styles = styled.div`
  .complete-ballot-table {
    width: 100%;
    & > tr {
      td {
        vertical-align: top;
        padding-bottom: 30px;
      }
      td:nth-child(1) {
        width: 25%;
      }
      td:nth-child(2) {
        width: 75%;
      }
    }
  }
`;

const AdminCompleteBallot = ({ ballot }) => (
  <>
    <div className="card-header lg:mr-24 lg:h-70px">
      <BackButton href="/admin/ballots" text="Back" force />
      <div className="flex justify-between items-center mb-3.5">
        <h3 className="text-dark2 text-xl lg:pr-32 font-medium">
          Completed Ballot
        </h3>
        <div className="flex flex-col-reverse lg:flex-wrap lg:flex-row justify-end">
          <Link href={`/admin/ballots/detail/${ballot?.id}/current-votes`}>
            <button
              type="button"
              className="lg:mr-5 h-16 lg:h-11 text-lg w-full text-white lg:w-48 rounded-full bg-primary hover:opacity-40 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none shadow-md"
            >
              View Voting Records
            </button>
          </Link>
        </div>
      </div>
      <div className="border-primary border-b-2" />
    </div>
    <div className="card-body pt-8 pb-28 overflow-y-auto lg:h-100%-70px">
      <div className="lg:pr-24">
        <Styles>
          <table className="complete-ballot-table border-0">
            <tr>
              <td>
                <span>Ballot Title:</span>
              </td>
              <td>
                <span>{ballot?.title}</span>
              </td>
            </tr>
            <tr>
              <td>
                <span>Final Result:</span>
              </td>
              <td>
                <StatusText content={ballot?.status} className="uppercase" />
              </td>
            </tr>
            <tr>
              <td>
                <span>Total Votes:</span>
              </td>
              <td>
                <span>{ballot?.vote?.result_count}</span>
              </td>
            </tr>
            <tr>
              <td>
                <span>Split (For/Against):</span>
              </td>
              <td>
                <p>
                  <ForAgainst
                    splitFor={ballot?.vote?.for_value}
                    splitAgainst={ballot?.vote?.against_value}
                  />
                </p>
              </td>
            </tr>
            <tr>
              <td>
                <span>Start Time:</span>
              </td>
              <td>
                <span>
                  {formatDate(ballot?.created_at, 'dd/MM/yyyy - hh:mm aaa')}
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <span>End Time:</span>
              </td>
              <td>
                <span>
                  {formatDate(ballot?.time_end, 'dd/MM/yyyy - hh:mm aaa')}
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <span>Ballot Text:</span>
              </td>
              <td>
                <span
                  dangerouslySetInnerHTML={{
                  __html: ballot?.description,
                  }}
                />
              </td>
            </tr>
            <tr>
              <td>
                <span>Files Attached:</span>
              </td>
              <td>
                <ul>
                  {ballot?.files?.map(file => (
                    <li className="flex pb-2">
                      <p className="w-52">{file}</p>
                      <a className="text-primary">View</a>
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          </table>
        </Styles>
      </div>
    </div>
  </>
);

export default AdminCompleteBallot;
