import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { Button, Slider } from '../../components/partials';
import Table, { useTable } from '../../components/partials/table';
import { formatDate, numberWithCommas } from '../../shared/core/utils';
import { getPublicMembers } from '../../shared/redux-saga/member-viewer/actions';
import IconRefresh from '../../public/images/ic_refresh.svg';
import PublicHeader from '../../components/layouts/public-header';

const TableSlider = styled.table`
  tr {
    td {
      padding-bottom: 1.2rem;
    }
    td:nth-child(1) {
      width: 30%;
    }
    td:nth-child(2) {
      width: 10%;
    }
    td:nth-child(3) {
      width: 60%;
    }
  }
`;

const Styles = styled.div`
  .members-table {
    display: flex;
    flex-direction: column;
    .col-1 {
      width: 20%;
      padding-right: 0 !important;
    }
    .col-2 {
      width: 20%;
      padding-right: 0 !important;
    }
    .col-3 {
      width: 12%;
      padding-right: 0 !important;
    }
    .col-4 {
      width: 12%;
      padding-right: 0 !important;
    }
    .col-5 {
      width: 13%;
      padding-right: 0 !important;
    }
    .col-6 {
      width: 13%;
      padding-right: 0 !important;
    }
    .col-7 {
      width: 10%;
      padding-right: 0 !important;
    }
  }
`;

const NodeExplorer = () => {
  const {
    data,
    setParams,
    params,
    register,
    hasMore,
    resetData,
    appendData,
    setHasMore,
    page,
    setPage,
  } = useTable();
  const dispatch = useDispatch();
  const [sliderValues, setSliderValues] = useState({
    delegation_rate: 0,
    delegators: 0,
    stake_amount: 0,
    update_responsiveness: 0,
    uptime: 0,
  });
  const router = useRouter();
  const [search, setSearch] = useState('');

  const fetchMembers = (pageValue = page, paramsValue = params) => {
    dispatch(
      getPublicMembers(
        { ...paramsValue, page: pageValue },
        (results, isHasMore) => {
          setHasMore(isHasMore);
          appendData(results);
          setPage(prev => prev + 1);
        }
      )
    );
  };

  const handleSlider = (key, val) => {
    setSliderValues({
      ...sliderValues,
      [key]: val,
    });
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const getMax = key => {
    let fields;
    if (key === 'all') {
      fields = Object.keys(sliderValues);
    } else {
      fields = Object.keys(sliderValues).filter(x => x !== key);
    }
    const total = fields.reduce((sum, x) => sum + (+sliderValues[x] || 0), 0);
    return 100 - total;
  };

  const refresh = () => {
    const newParams = {};
    setParams(newParams);
    resetData();
    fetchMembers(1, newParams);
  };

  const applySlider = () => {
    let newParams = {
      ...sliderValues,
      sort_key: 'totalScore',
    };
    if (search) {
      newParams = {
        ...newParams,
        search: search.trim(),
      };
    }
    setParams(newParams);
    resetData();
    fetchMembers(1, newParams);
  };

  const handleSearch = value => {
    setSearch(value);
    let newParams = { search: value.trim() };
    if (getMax('all') !== 100) {
      newParams = {
        ...newParams,
        ...sliderValues,
        sort_key: 'totalScore',
      };
    }
    setParams(newParams);
    resetData();
    fetchMembers(1, newParams);
  };

  return (
    <div className="flex flex-col h-screen">
      <PublicHeader />
      <div className="flex-1 min-h-0 flex flex-col pt-14 mx-auto w-container bg-transparent">
        <div className="flex h-2/5">
          <div className="w-4/5 border-r-2 border-gray">
            <h2 className="text-lg font-medium">
              Drag the sliders to adjust the weighted score for each category.
            </h2>
            <TableSlider className="text-gray text-xs my-5 w-10/12">
              <tbody>
                <tr>
                  <td>Uptime</td>
                  <td>{sliderValues.uptime || 0}</td>
                  <td>
                    <Slider
                      onChange={val => handleSlider('uptime', val)}
                      maxValue={getMax('uptime')}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Validator Fee</td>
                  <td>{sliderValues.delegation_rate || 0}</td>
                  <td>
                    <Slider
                      onChange={val => handleSlider('delegation_rate', val)}
                      maxValue={getMax('delegation_rate')}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Update Responsiveness</td>
                  <td>{sliderValues.update_responsiveness || 0}</td>
                  <td>
                    <Slider
                      maxValue={getMax('update_responsiveness')}
                      onChange={val =>
                        handleSlider('update_responsiveness', val)
                      }
                    />
                  </td>
                </tr>
                <tr>
                  <td>Delegators</td>
                  <td>{sliderValues.delegators || 0}</td>
                  <td>
                    <Slider
                      maxValue={getMax('delegators')}
                      onChange={val => handleSlider('delegators', val)}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Stake Amount</td>
                  <td>{sliderValues.stake_amount || 0}</td>
                  <td>
                    <Slider
                      maxValue={getMax('stake_amount')}
                      onChange={val => handleSlider('stake_amount', val)}
                    />
                  </td>
                </tr>
              </tbody>
            </TableSlider>
            {getMax('all') === 100 && (
              <Button primary onClick={() => refresh()}>
                <IconRefresh className="mr-2" /> Refresh
              </Button>
            )}
            {getMax('all') !== 100 && (
              <Button primary onClick={() => applySlider()}>
                Apply to Table
              </Button>
            )}
          </div>
          <div className="pl-8 w-1/5 font-medium">
            <h3 className="text-base mb-9">Remaining Points</h3>
            <h2 className="text-6xl mb-2">{getMax('all')}</h2>
            {getMax('all') === 0 && (
              <p className="text-primary text-xs">
                All of your points are allocated!
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col h-3/5">
          <div className="flex justify-between pt-8 border-primary border-b-2 pb-3">
            <div className="flex flex-col justify-center">
              <h3 className="text-dark2 text-lg font-medium">Member Nodes</h3>
              <p className="text-xs text-gray">
                Click on a user to see more details
              </p>
            </div>
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={e => handleSearch(e.target.value)}
              className="w-52 h-11 px-7 rounded-full shadow-activeLink focus:outline-none disabled:text-gray"
            />
          </div>
          <div className="flex w-full flex-1 min-h-0 mb-5">
            <Styles className="h-full w-full">
              <Table
                {...register}
                className="members-table pt-5 h-full w-full"
                onLoadMore={fetchMembers}
                hasMore={hasMore}
                dataLength={data.length}
              >
                <Table.Header>
                  <Table.HeaderCell key="name">
                    <p>Users Name</p>
                  </Table.HeaderCell>
                  <Table.HeaderCell key="regDate">
                    <p>Registration Date</p>
                  </Table.HeaderCell>
                  <Table.HeaderCell key="verified">
                    <p>Verified</p>
                  </Table.HeaderCell>
                  <Table.HeaderCell key="rate">
                    <p>Rate</p>
                  </Table.HeaderCell>
                  <Table.HeaderCell key="delegates">
                    <p>Delegates</p>
                  </Table.HeaderCell>
                  <Table.HeaderCell key="cspr">
                    <p>CSPR Delegated</p>
                  </Table.HeaderCell>
                  <Table.HeaderCell key="uptime">
                    <p>Uptime</p>
                  </Table.HeaderCell>
                </Table.Header>
                <Table.Body className="">
                  {data.map((row, ind) => (
                    <Table.BodyRow
                      key={`a-${ind}`}
                      selectRowHandler={() =>
                        router.push(`/node-explorer/${row.id}`)
                      }
                    >
                      <Table.BodyCell key="body1">
                        <p className="truncate">{row.full_name}</p>
                      </Table.BodyCell>
                      <Table.BodyCell key="body2">
                        <p>{`${formatDate(row.created_at, 'dd/MM/yyyy')}`}</p>
                      </Table.BodyCell>
                      <Table.BodyCell key="body3">
                        <p
                          className={row.kyc_verified_at ? 'text-primary' : ''}
                        >
                          {row.kyc_verified_at ? 'Verified' : 'Not Verified'}
                        </p>
                      </Table.BodyCell>
                      <Table.BodyCell key="body4">
                        <p className="capitalize">
                          {row.delegation_rate || 0}%
                        </p>
                      </Table.BodyCell>
                      <Table.BodyCell key="body5">
                        <p>{row.delegators_count || 0}</p>
                      </Table.BodyCell>
                      <Table.BodyCell key="body6">
                        <p>{numberWithCommas(row.total_staked_amount)}</p>
                      </Table.BodyCell>
                      <Table.BodyCell key="body7">
                        <p>{row.uptime || 0}%</p>
                      </Table.BodyCell>
                    </Table.BodyRow>
                  ))}
                </Table.Body>
              </Table>
            </Styles>
          </div>
        </div>
      </div>
      <footer className="pb-2 flex justify-center text-xs">
        ©2022 CasperLabs.io
      </footer>
    </div>
  );
};

export default NodeExplorer;
