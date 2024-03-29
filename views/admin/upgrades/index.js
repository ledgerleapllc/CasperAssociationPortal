/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-no-target-blank */
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect, useContext } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import LayoutDashboard from '../../../components/layouts/layout-dashboard';
import { Card, Table, Button } from '../../../components/partials';
import {
  deleteUpgrade,
  getUpgrades,
} from '../../../shared/redux-saga/admin/actions';
import { useTable } from '../../../components/partials/table';
import { LoadingScreen } from '../../../components/hoc/loading-screen';
import { useDialog } from '../../../components/partials/dialog';
import { AppContext } from '../../../pages/_app';

const Styles = styled.div`
  .upgrades-table {
    display: flex;
    flex-direction: column;
    .col-1 {
      width: 20%;
      padding-right: 0 !important;
    }
    .col-2 {
      width: 25%;
      padding-right: 0 !important;
    }
    .col-3 {
      width: 22%;
      padding-right: 0 !important;
    }
    .col-4 {
      width: 25%;
      padding-right: 0 !important;
    }
    .col-5 {
      width: 8%;
      padding-right: 0 !important;
    }
  }
`;

const AdminUpgradeList = () => {
  const { data, register, hasMore, appendData, resetData, setHasMore } =
    useTable();
  const dispatch = useDispatch();
  const { setDialog, onClosed } = useDialog();
  const { setLoading } = useContext(AppContext);

  const getAdminUpgrades = () => {
    resetData();
    dispatch(
      getUpgrades(
        {},
        results => {
          setHasMore(false);
          appendData(results);
        },
        () => {
          setHasMore(false);
          appendData([]);
        }
      )
    );
  };

  useEffect(() => {
    getAdminUpgrades();
  }, []);

  const confirmDelete = id => {
    setLoading(true);
    dispatch(
      deleteUpgrade(
        id,
        () => {
          onClosed();
          window.location.reload();
        },
        () => {
          setLoading(false);
          onClosed();
        }
      )
    );
  };

  const clickDelete = id => {
    setDialog({
      type: 'DialogCustom',
      data: {
        content: (
          <div
            className="text-center mx-auto py-20"
            style={{ maxWidth: '26rem' }}
          >
            <h3 className="text-xl text-center mb-2.5">
              Are you sure you are going to delete this upgrade?
            </h3>
            <div className="mt-8 flex justify-center gap-5 items-center">
              <button
                type="button"
                className="outline-none rounded-full h-24 w-24 font-normal border-transparent hover:opacity-40 text-white bg-primary"
                onClick={() => confirmDelete(id)}
              >
                Confirm
              </button>
              <button
                type="button"
                className="px-5 outline-none rounded-full h-24 w-24 font-normal bg-transparent hover:opacity-40 text-primary border border-primary"
                onClick={() => onClosed()}
              >
                Cancel
              </button>
            </div>
          </div>
        ),
      },
    });
  };

  return (
    <>
      <Head>
        <title>Upgrades - Casper Association Portal</title>
      </Head>
      <LayoutDashboard>
        <Card className="h-full px-card py-5">
          <div className="flex flex-col bg-transparent h-full">
            <div className="w-full flex flex-col justify-center">
              <div className="flex justify-between items-end pb-3">
                <h3 className="text-dark2 text-lg font-medium">Upgrade List</h3>
                <Link to="/admin/upgrades/add">
                  <span>
                    <Button primary>+ New Upgrade</Button>
                  </span>
                </Link>
              </div>
              <div className="border-primary border-b-2" />
            </div>
            <div className="pt-8 flex flex-col flex-1 min-h-0">
              <Styles className="h-full">
                <Table
                  {...register}
                  className="upgrades-table h-full"
                  onLoadMore={() => {}}
                  hasMore={hasMore}
                  dataLength={data?.length}
                >
                  <Table.Header>
                    <Table.HeaderCell key="version_H">
                      <p>Version</p>
                    </Table.HeaderCell>
                    <Table.HeaderCell key="activation_date_H">
                      <p>Activation Date</p>
                    </Table.HeaderCell>
                    <Table.HeaderCell key="activation_era_H">
                      <p>Activation ERA</p>
                    </Table.HeaderCell>
                    <Table.HeaderCell key="link_H">
                      <p>Link</p>
                    </Table.HeaderCell>
                    <Table.HeaderCell key="action_H">
                      <p>&nbsp;</p>
                    </Table.HeaderCell>
                  </Table.Header>
                  <Table.Body className="custom-padding-tracker">
                    {data.map((row, ind) => (
                      <Table.BodyRow key={ind}>
                        <Table.BodyCell key="version">
                          <p className="truncate">
                            <b>{row.version}</b>
                          </p>
                        </Table.BodyCell>
                        <Table.BodyCell key="activation_date">
                          <p className="truncate">{row.activation_date}</p>
                        </Table.BodyCell>
                        <Table.BodyCell key="activation_era">
                          <p className="truncate">{row.activation_era}</p>
                        </Table.BodyCell>
                        <Table.BodyCell key="link">
                          <p className="truncate underline">
                            <a href={row.link} target="_blank">
                              {row.link}
                            </a>
                          </p>
                        </Table.BodyCell>
                        <Table.BodyCell key="action">
                          <p className="flex items-center">
                            <Link
                              className="underline text-xs font-bold"
                              to={`/admin/upgrades/edit/${row.id}`}
                            >
                              Edit
                            </Link>
                            <a
                              className="ml-2 underline text-xs font-bold"
                              onClick={() => clickDelete(row.id)}
                            >
                              Delete
                            </a>
                          </p>
                        </Table.BodyCell>
                      </Table.BodyRow>
                    ))}
                  </Table.Body>
                </Table>
              </Styles>
            </div>
          </div>
        </Card>
      </LayoutDashboard>
    </>
  );
};

export default LoadingScreen(AdminUpgradeList, 'final-admin', 'upgrades');
