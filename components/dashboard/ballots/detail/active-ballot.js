/* eslint-disable react/no-danger */
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { ClockBar } from '../../../partials';
import { LogViewedDocsDialog } from '../dialogs/log-viewed-docs';
import { useDialog } from '../../../partials/dialog';

const Styles = styled.div`
  .active-ballot-table {
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

const ActiveBallot = React.memo(({ ballot, onViewedFile }) => {
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

  const viewdFile = file => {
    if (!isAdmin) {
      onViewedFile(file);
    }
  };

  const renderTimer = () => {
    if (
      ballot?.start_date &&
      ballot?.start_time &&
      ballot?.end_date &&
      ballot?.end_time
    ) {
      return (
        <ClockBar
          className="w-40"
          endTime={new Date(`${ballot?.end_date} ${ballot?.end_time}`)}
          startTime={new Date(`${ballot?.start_date} ${ballot?.start_time}`)}
        />
      );
    }
    return (
      <ClockBar
        className="w-40"
        endTime={new Date(ballot?.time_end)}
        startTime={new Date(ballot?.created_at)}
      />
    );
  };

  return (
    <Styles className="lg:pr-card">
      <table className="active-ballot-table border-0">
        <tbody>
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
              <span>Time Remaining:</span>
            </td>
            <td>{ballot && renderTimer()}</td>
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
                {ballot?.files?.map((file, index) => (
                  <li key={index} className="flex pb-8">
                    <p className="w-80 pr-12">{file.name}</p>
                    <div className="flex flex-col">
                      <a
                        href={`${file.file_url}`}
                        target="_blank"
                        rel="noreferrer"
                        className="underline text-primary"
                        onClick={() => viewdFile(file)}
                      >
                        {isAdmin ? 'View Document' : 'View'}
                      </a>
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
});

export default ActiveBallot;
