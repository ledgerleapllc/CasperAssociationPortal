/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import styled from 'styled-components';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { ClockBar } from '../../../partials';
import { LogViewedDocsDialog } from '../dialogs/log-viewed-docs';
import { viewedAttachDocument } from '../../../../shared/redux-saga/dashboard/dashboard-actions';
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

const ActiveBallot = ({ ballot, onViewedFile }) => {
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
            <td>
              {ballot && (
                <ClockBar
                  className="w-40"
                  endTime={new Date(ballot.time_end)}
                  startTime={new Date(ballot.created_at)}
                />
              )}
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
                  <li className="flex pb-8">
                    <p className="w-80 pr-12">{file.name}</p>
                    <div className="flex flex-col">
                      <Link href={`${file.file_url}`}>
                        <a
                          target="_blank"
                          className="underline text-primary"
                          onClick={() => viewdFile(file)}
                        >
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
}

export default ActiveBallot;
