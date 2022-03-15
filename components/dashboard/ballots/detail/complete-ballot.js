/* eslint-disable react/no-danger */
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { StatusText, ForAgainst, ProgressBar } from '../../../partials';
import { formatDate } from '../../../../shared/core/utils';
import { useDialog } from '../../../partials/dialog';
import { LogViewedDocsDialog } from '../dialogs/log-viewed-docs';

const Styles = styled.div`
  .complete-ballot-table {
    width: 100%;
    tr {
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

const CompleteBallot = ({ ballot }) => {
  const userInfo = useSelector(state => state.authReducer.userInfo.fullInfo);
  const [isAdmin, setIsAdmin] = useState();
  const { setDialog } = useDialog();

  useEffect(() => {
    const isAdminTemp = ['admin', 'sub-admin'].includes(userInfo?.role);
    setIsAdmin(isAdminTemp);
  }, [userInfo]);

  const seeUserViewedDoc = file => {
    setDialog({
      type: 'DialogCustom',
      data: {
        content: <LogViewedDocsDialog id={file?.id} />,
      },
    });
  };

  const renderStartTime = () => {
    if (ballot?.start_date && ballot?.start_time) {
      return (
        <span>
          {`${formatDate(
            `${ballot?.start_date} ${ballot?.start_time}`,
            'dd/MM/yyyy - hh:mm aaa'
          )} EST`}
        </span>
      );
    }
    return (
      <span>
        {`${formatDate(ballot?.created_at, 'dd/MM/yyyy - hh:mm aaa')} EST`}
      </span>
    );
  };

  const renderEndTime = () => {
    if (ballot?.end_date && ballot?.end_time) {
      return (
        <span>
          {`${formatDate(
            `${ballot?.end_date} ${ballot?.end_time}`,
            'dd/MM/yyyy - hh:mm aaa'
          )} EST`}
        </span>
      );
    }
    return (
      <span>
        {`${formatDate(ballot?.time_end, 'dd/MM/yyyy - hh:mm aaa')} EST`}
      </span>
    );
  };

  return (
    <Styles className="lg:pr-card">
      <table className="complete-ballot-table border-0">
        <tbody>
          {!isAdmin && (
            <tr>
              <td>
                <span>Result:</span>
              </td>
              <td>
                <div className="w-1/3">
                  <div className="mb-6">
                    <div className="flex">
                      <span className="text-xl">For</span>
                      <button
                        type="button"
                        className="focus:outline-none ml-2 pb-2"
                      >
                        <img
                          src="/images/ic_info.svg"
                          alt="prev"
                          width="10"
                          height="10"
                          className="mr-2"
                        />
                      </button>
                    </div>
                    <ProgressBar
                      value={ballot.vote?.for_value}
                      total={ballot.vote?.result_count}
                      mask="x%"
                    />
                  </div>
                  <div>
                    <div className="flex">
                      <span className="text-xl">Against</span>
                      <button
                        type="button"
                        className="focus:outline-none ml-2 pb-2"
                      >
                        <img
                          src="/images/ic_info.svg"
                          alt="prev"
                          width="10"
                          height="10"
                          className="mr-2"
                        />
                      </button>
                    </div>
                    <ProgressBar
                      value={ballot.vote?.against_value}
                      total={ballot.vote?.result_count}
                      mask="x%"
                    />
                  </div>
                </div>
              </td>
            </tr>
          )}
          <tr>
            <td>
              <span>Ballot Title:</span>
            </td>
            <td>
              <span>{ballot?.title}</span>
            </td>
          </tr>
          {!!isAdmin && (
            <>
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
                  <ForAgainst
                    splitFor={ballot?.vote?.for_value}
                    splitAgainst={ballot?.vote?.against_value}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <span>Start Time:</span>
                </td>
                <td>{renderStartTime()}</td>
              </tr>
              <tr>
                <td>
                  <span>End Time:</span>
                </td>
                <td>{renderEndTime()}</td>
              </tr>
            </>
          )}
          {!isAdmin && (
            <tr>
              <td>
                <span>Time Remaining:</span>
              </td>
              <td>
                <span className="text-primary">Ended</span>
              </td>
            </tr>
          )}
          <tr>
            <td>
              <span>Ballot Text:</span>
            </td>
            <td>
              <div className="w-2/3">
                <span
                  dangerouslySetInnerHTML={{
                    __html: ballot?.description,
                  }}
                />
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <span>Files Attached:</span>
            </td>
            <td>
              <ul>
                {ballot?.files?.map((file, index) => (
                  <li key={index} className="flex pb-8">
                    <p className="w-80 pr-12">{file.name}</p>
                    <div className="flex flex-col">
                      <Link to={`${file.file_url}`}>
                        <a target="_blank" className="underline text-primary">
                          {isAdmin ? 'View Document' : 'View'}
                        </a>
                      </Link>
                      {!!isAdmin && (
                        <button
                          type="button"
                          onClick={() => seeUserViewedDoc(file)}
                          className="underline text-primary"
                        >
                          See who has viewed this document
                        </button>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </Styles>
  );
};

export default CompleteBallot;
