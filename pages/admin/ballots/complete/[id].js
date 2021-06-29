import styled from 'styled-components';
import { LoadingScreen } from '../../../../components/hoc/loading-screen';
import LayoutDashboard from '../../../../components/layouts/layout-dashboard';
import { Card, BackButton, StatusText, ForAgainst } from '../../../../components/partials';
import { formatDate } from '../../../../shared/core/utils';

const ballot = {
  id: 1,
  title: 'Title of ballot - There is room for a long title',
  time_remaining: new Date('2021-06-30T16:55:06.439Z'),
  text: 'Mauris a libero ac nisl tristique consequat sed ac sem. Nulla cursus est ac sapien vehicula gravida. Sed dui tortor, accumsan nec augue non, egestas malesuada mauris. Maecenas non urna mollis ex tempus luctus nec sit amet purus. Nam in lobortis lorem, in porttitor enim. Quisque sit amet ligula at tortor dictum viverra id et eros. Ut ultrices enim a enim convallis varius. Nulla fermentum et mi vitae fringilla. Proin sed congue elit, nec tristique leo. Praesent porttitor, lectus at semper scelerisque, leo lectus ornare ipsum, eget maximus orci nibh et magna. Cras in interdum leo. Curabitur a ante diam. Nunc nec ullamcorper felis. Nullam eget enim fermentum, aliquam quam nec, accumsan risus. Ut faucibus congue massa eget suscipit. Aliquam erat volutpat. Duis porta rhoncus ante, et aliquet ligula varius ut. Morbi sed viverra dui. Duis sed justo metus. Mauris vel massa et purus facilisis congue. Praesent nisi dui, semper et facilisis nec, mattis non orci. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quis volutpat ex. Duis eget arcu suscipit, mollis ante in, congue erat. Aliquam augue lacus, ornare vel orci ac, euismod volutpat lorem. Proin varius auctor libero vel luctus.',
  total_votes: '199',
  split_for: '100',
  split_against: '99',
  final_result: 'pass',
  start_date: new Date('2021-06-25T16:55:06.439Z'),
  end_date: new Date('2021-07-01T16:55:06.439Z'),
  files: ['flowchart_document1.pdf', 'doc2-readme.pdf'],
};
const Styles = styled.table`
  .active-ballot-table {
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

const AdminCompleteBallot = () => (
  <LayoutDashboard>
    <Card className="h-full lg:pl-24 lg:py-11 lg:shadow-2xl" noShadow>
      <div className="w-full h-full">
        <div className="card-header lg:mr-24 lg:h-70px">
          <BackButton href="/admin/ballots" text="Back" />
          <div className="flex justify-between items-center mb-3.5">
            <h3 className="text-dark2 text-xl lg:pr-32 font-medium">
              Manage Active Ballot
            </h3>
            <div className="flex flex-col-reverse lg:flex-wrap lg:flex-row justify-end">
              <button
                type="button"
                className="lg:mr-5 h-16 lg:h-11 text-lg w-full text-white lg:w-48 rounded-full bg-primary hover:opacity-40 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none shadow-md"
              >
                View Current Votes
              </button>
              <button
                type="button"
                className="h-16 lg:h-11 w-full text-lg text-primary lg:w-48 rounded-full bg-none border-2 border-primary hover:opacity-40 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none shadow-md"
              >
                Cancel Ballot
              </button>
            </div>
          </div>
          <div className="border-primary border-b-2" />
        </div>
        <div className="card-body pt-8 pb-28 overflow-y-auto lg:h-100%-70px">
          <div className="lg:pr-24">
            <Styles>
              <table className="active-ballot-table border-0">
                <tr>
                  <td>
                    <span>Ballot Title:</span>
                  </td>
                  <td>
                    <span>{ballot.title}</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span>Final Result:</span>
                  </td>
                  <td>
                    <StatusText
                      content={ballot.final_result}
                      className="uppercase"
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <span>Total Votes:</span>
                  </td>
                  <td>
                    <span>{ballot.total_votes}</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span>Split (For/Against):</span>
                  </td>
                  <td>
                    <p>
                      <ForAgainst
                        splitFor={ballot.split_for}
                        splitAgainst={ballot.split_against}
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
                      {formatDate(ballot.start_date, 'dd/MM/yyyy - hh:mm aaa')}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span>End Time:</span>
                  </td>
                  <td>
                    <span>
                      {formatDate(ballot.end_date, 'dd/MM/yyyy - hh:mm aaa')}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span>Ballot Text:</span>
                  </td>
                  <td>
                    <span>{ballot.text}</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span>Files Attached:</span>
                  </td>
                  <td>
                    <ul>
                      {ballot.files.map(file => (
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
      </div>
    </Card>
  </LayoutDashboard>
);

export default LoadingScreen(AdminCompleteBallot, 'final-all');
