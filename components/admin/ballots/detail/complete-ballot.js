import styled from 'styled-components';
import Link from 'next/link';
import { BackButton, StatusText, ForAgainst, Button } from '../../../partials';
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
  <div className="h-full flex flex-col">
    <div className="card-header lg:mr-card border-primary border-b-2">
      <div className="flex justify-between items-center mb-3">
        <div className="h-11 mt-4">
          <BackButton href="/admin/ballots" text="Back" force />
          <h3 className="text-dark2 text-lg lg:pr-32 font-medium">
            Completed Ballot
          </h3>
        </div>
        <div className="flex flex-col-reverse lg:flex-wrap lg:flex-row justify-end">
          <Link href={`/admin/ballots/detail/${ballot?.id}/current-votes`}>
            <Button primary>View Voting Records</Button>
          </Link>
        </div>
      </div>
    </div>
    <div className="card-body pt-8 overflow-y-auto flex-1 min-h-0">
      <div className="lg:pr-card">
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
                      <p className="w-52">{file.name}</p>
                      <Link href={`${file.file_url}`}>
                        <a target="_blank" className="text-primary">
                          View
                        </a>
                      </Link>
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          </table>
        </Styles>
      </div>
    </div>
  </div>
);

export default AdminCompleteBallot;
