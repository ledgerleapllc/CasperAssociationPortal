import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import Head from 'next/head';
import InfoIcon from '@material-ui/icons/Info';
import { Button, Slider, Tooltips } from '../../components/partials';
import Table, { useTable } from '../../components/partials/table';
import { formatDate, numberWithCommas } from '../../shared/core/utils';
import { getPublicMembers } from '../../shared/redux-saga/member-viewer/actions';
import IconRefresh from '../../public/images/ic_refresh.svg';
import PublicHeader from '../../components/layouts/public-header';
import AppFooter from '../../components/layouts/app-footer';

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
  } = useTable();
  const dispatch = useDispatch();
  const [sliderValues, setSliderValues] = useState({
    delegation_rate: 0,
    delegators: 0,
    stake_amount: 0,
    update_responsiveness: 0,
    uptime: 0,
  });
  const router = useHistory();
  const [search, setSearch] = useState('');

  const fetchMembers = (paramsValue = params) => {
    dispatch(
      getPublicMembers({ ...paramsValue }, results => {
        setHasMore(false);
        appendData(results);
      })
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

  const getTotal = () => {
    const fields = Object.keys(sliderValues);
    const total = fields.reduce((sum, x) => sum + (+sliderValues[x] || 0), 0);
    return total;
  };

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
    fetchMembers(newParams);
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
    fetchMembers(newParams);
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
    fetchMembers(newParams);
  };

  return (
    <>
      <Head>
        <title>Validator Selection Tool - Casper Association Portal</title>
      </Head>
      <div className="flex flex-col h-screen">
        <PublicHeader />
        <div className="flex-1 min-h-0 flex flex-col pt-14 mx-auto w-container bg-transparent">
          <div className="flex h-2/5">
            <div className="w-4/5 border-r-2 border-gray">
              <h2 className="text-lg font-medium">
                Validator Selection Tool - Drag the sliders to adjust the{' '}
                weighted score for each category.
              </h2>
              <TableSlider className="text-gray text-xs my-5 w-10/12">
                <tbody>
                  <tr>
                    <td>
                      <p className="flex gap-2 items-center text-xs text-gray">
                        <span>Uptime</span>
                        <Tooltips
                          disableTheme
                          placement="top"
                          title="30 day rolling uptime percentage of a validator"
                          arrow
                          className="cursor-pointer"
                        >
                          <InfoIcon
                            style={{ color: 'black' }}
                            fontSize="small"
                          />
                        </Tooltips>
                      </p>
                    </td>
                    <td>{sliderValues.uptime || 0}</td>
                    <td>
                      <Slider
                        onChange={val => handleSlider('uptime', val)}
                        maxValue={getMax('uptime')}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p className="flex gap-2 items-center text-xs text-gray">
                        <span>Validator Fee</span>
                        <Tooltips
                          disableTheme
                          placement="top"
                          title="The percentage a particular validator's take from the rewards pool"
                          arrow
                          className="cursor-pointer"
                        >
                          <InfoIcon
                            style={{ color: 'black' }}
                            fontSize="small"
                          />
                        </Tooltips>
                      </p>
                    </td>
                    <td>{sliderValues.delegation_rate || 0}</td>
                    <td>
                      <Slider
                        onChange={val => handleSlider('delegation_rate', val)}
                        maxValue={getMax('delegation_rate')}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p className="flex gap-2 items-center text-xs text-gray">
                        <span>Update Responsiveness</span>
                        <Tooltips
                          disableTheme
                          placement="top"
                          title="Hint of a validator's promptness to mandatory protocol upgrades"
                          arrow
                          className="cursor-pointer"
                        >
                          <InfoIcon
                            style={{ color: 'black' }}
                            fontSize="small"
                          />
                        </Tooltips>
                      </p>
                    </td>
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
                    <td>
                      <p className="flex gap-2 items-center text-xs text-gray">
                        <span>Delegators</span>
                        <Tooltips
                          disableTheme
                          placement="top"
                          title="Total count of delegators to a particular validator"
                          arrow
                          className="cursor-pointer"
                        >
                          <InfoIcon
                            style={{ color: 'black' }}
                            fontSize="small"
                          />
                        </Tooltips>
                      </p>
                    </td>
                    <td>{sliderValues.delegators || 0}</td>
                    <td>
                      <Slider
                        maxValue={getMax('delegators')}
                        onChange={val => handleSlider('delegators', val)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p className="flex gap-2 items-center text-xs text-gray">
                        <span>Stake Amount</span>
                        <Tooltips
                          disableTheme
                          placement="top"
                          title="Total amount staked to a particular validator. Self stake + third party stake"
                          arrow
                          className="cursor-pointer"
                        >
                          <InfoIcon
                            style={{ color: 'black' }}
                            fontSize="small"
                          />
                        </Tooltips>
                      </p>
                    </td>
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
              <h3 className="text-base mb-5">Remaining Weight</h3>
              <h2 className="text-4xl mb-2">{getTotal()} / 100</h2>
              <p className="mt-5 mb-3 text-xs text-gray">
                Drag the sliders to customize the facets that are most important
                to you in selecting a validator. As you assign points, the
                validators in the Casper network will be ranked according to the
                weights you give to each Add total points and a summary of what
                it is.
              </p>
              {getMax('all') === 0 && (
                <p className="text-primary text-xs">
                  All of your weight has been allocated!
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col h-3/5">
            <div className="flex justify-between pt-8 border-primary border-b-2 pb-3">
              <div className="flex flex-col justify-center">
                <h3 className="text-dark2 text-lg font-medium">
                  Member nodes ranked by your criteria
                </h3>
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
                  onLoadMore={() => {}}
                  hasMore={hasMore}
                  dataLength={data.length}
                >
                  <Table.Header>
                    <Table.HeaderCell key="name">
                      <p>Name</p>
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
                      <p>Total Stake</p>
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
                          router.push(`/validator-selection-tool/${row.id}`)
                        }
                      >
                        <Table.BodyCell key="body1">
                          <p className="truncate">{row.pseudonym}</p>
                        </Table.BodyCell>
                        <Table.BodyCell key="body2">
                          <p>{`${formatDate(row.created_at, 'dd/MM/yyyy')}`}</p>
                        </Table.BodyCell>
                        <Table.BodyCell key="body3">
                          <p
                            className={
                              row.kyc_verified_at ? 'text-primary' : ''
                            }
                          >
                            {row.kyc_verified_at ? 'Verified' : 'Not Verified'}
                          </p>
                        </Table.BodyCell>
                        <Table.BodyCell key="body4">
                          <p className="capitalize">
                            {row.delegation_rate * 100 || 0}%
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
        <div className="pb-3">
          <AppFooter />
        </div>
      </div>
    </>
  );
};

export default NodeExplorer;
