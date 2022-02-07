import { useState, useEffect, useRef, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Switch from 'react-switch';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { getNodesFromAdmin } from '../../shared/redux-saga/admin/actions';
import { getNodesFromUser } from '../../shared/redux-saga/auth/actions';
import Table, { useTable } from '../partials/table';
import { getShortNodeAddress } from '../../shared/core/utils';
import { Tooltips } from '../partials';
import useMetrics from '../hooks/useMetrics';

const Styles = styled.div`
  .nodes-table {
    .infinite-scroll-component__outerdiv {
      margin-right: 0;
    }
    .table-header {
      height: 0;
    }
    min-width: 0;
    .col {
      height: 1.5rem;
    }
    .col-1 {
      padding-left: 0.5rem;
      width: 15%;
      padding-right: 0 !important;
    }
    .col-2 {
      width: 85%;
      padding-right: 0 !important;
    }
    .custom-row {
      border: 0;
    }
  }
`;

const NodesList = ({ userInfo, isAdmin, filter, hightlightNode }) => {
  const dispatch = useDispatch();
  const {
    data,
    setParams,
    resetData,
    hasMore,
    appendData,
    setHasMore,
    page,
    register,
    params,
    setPage,
  } = useTable();
  const renderDone = useRef();

  const getNodes = (pageValue = page, paramsValue = params, limit = 20) => {
    if (isAdmin) {
      dispatch(
        getNodesFromAdmin(
          { page: pageValue, ...paramsValue, limit },
          (result, isHasMore) => {
            setHasMore(isHasMore);
            appendData(result);
            setPage(prev => prev + 1);
            renderDone.current = true;
          }
        )
      );
    } else {
      dispatch(
        getNodesFromUser({ page: pageValue, limit }, (result, isHasMore) => {
          setHasMore(isHasMore);
          appendData(result);
          setPage(prev => prev + 1);
          renderDone.current = true;
        })
      );
    }
  };

  useEffect(() => {
    const newParams = filter.node_failing ? filter : {};
    getNodes(1, newParams);
  }, []);

  useEffect(() => {
    if (renderDone.current) {
      const newParams = filter.node_failing ? filter : {};
      setParams(newParams);
      resetData();
      getNodes(1, newParams);
    }
  }, [filter]);

  const renderClass = row => {
    if (!isAdmin && userInfo.public_address_node === row.public_address_node) {
      return 'custom-highlight';
    }
    if (isAdmin && row.is_fail_node) {
      return 'fail-node';
    }
    if (
      isAdmin &&
      hightlightNode?.public_address_node === row.public_address_node
    ) {
      return 'custom-highlight';
    }
    return '';
  };

  return (
    <Styles className="h-full w-full text-base font-thin">
      <Table
        {...register}
        className="nodes-table w-full h-full min-w-full pl-7px"
        onLoadMore={getNodes}
        hasMore={hasMore}
        dataLength={data.length}
      >
        <Table.Header>
          <Table.HeaderCell key="emptyHeader1" />
          <Table.HeaderCell key="emptyHeader2" />
        </Table.Header>
        <Table.Body>
          {data.map((row, ind) => (
            <Table.BodyRow
              key={ind}
              className={`pl-5 custom-row ${renderClass(row)}`}
            >
              <Table.BodyCell key="index">
                <p>{ind + 1}</p>
              </Table.BodyCell>
              <Table.BodyCell key="tooltips">
                {isAdmin && (
                  <Link href={`/admin/users/${row.user_id}`}>
                    <a>
                      <Tooltips
                        placement="left"
                        title={row.public_address_node}
                        arrow
                      >
                        <p className="relative h-full">
                          <span className="truncate absolute inset-0">
                            {getShortNodeAddress(row.public_address_node, 20)}
                          </span>
                        </p>
                      </Tooltips>
                    </a>
                  </Link>
                )}
                {!isAdmin && (
                  <Tooltips
                    placement="left"
                    title={row.public_address_node}
                    arrow
                    key="public_address"
                  >
                    <p className="relative h-full">
                      <span className="truncate absolute inset-0">
                        {getShortNodeAddress(row.public_address_node, 20)}
                      </span>
                    </p>
                  </Tooltips>
                )}
              </Table.BodyCell>
            </Table.BodyRow>
          ))}
        </Table.Body>
      </Table>
    </Styles>
  );
};

const InfoRightNode = memo(({ currentNode }) => {
  const userInfo = useSelector(state => state.authReducer.userInfo.fullInfo);
  const [isAdmin, setIsAdmin] = useState(null);
  const [filterFailedNodes, setFilterFailedNodes] = useState(null);
  const router = useRouter();
  const { metrics } = useMetrics();

  useEffect(() => {
    if (userInfo) {
      const isAdminTemp = ['admin', 'sub-admin'].includes(userInfo?.role);
      setIsAdmin(isAdminTemp);
      if (isAdminTemp && +router.query.node_failing === 1) {
        setFilterFailedNodes(1);
      } else {
        setFilterFailedNodes(0);
      }
    }
  }, [userInfo]);

  return (
    <div id="dashboard-content-node1" className="bg-white">
      <div className="flex flex-col w-full h-full">
        <div id="dashboard-content-node1__header" className="pl-3">
          <div id="dashboard-content-node1__title">
            <span className="text-lg font-normal pr-1">Node Rank&nbsp;</span>
            <Tooltips
              placement="top"
              title={
                <>
                  <p>Ranks all nodes in the platform weighted equally.</p>
                  <p>
                    Your Node Rank:
                    {metrics?.rank
                      ? `${metrics?.rank} out of ${metrics?.totalCount}`
                      : ''}
                  </p>
                </>
              }
              arrow
            >
              <img
                width="10px"
                height="10px"
                src="/images/ic_feather_info.svg"
                alt="Info"
              />
            </Tooltips>
          </div>
          {!!isAdmin && (
            <div
              id="dashboard-content-node1__switch"
              className="flex items-center px-4"
            >
              <span className="pr-2 text-sm">Only Failing</span>
              <Switch
                id="status"
                checked={!!filterFailedNodes}
                onChange={_check => setFilterFailedNodes(_check ? 1 : 0)}
                checkedIcon={null}
                uncheckedIcon={null}
                offColor="#bbb"
                onColor="#ff474e"
                height={18}
                width={30}
              />
            </div>
          )}
        </div>
        {isAdmin !== null && filterFailedNodes !== null && (
          <NodesList
            hightlightNode={currentNode}
            userInfo={userInfo}
            isAdmin={isAdmin}
            filter={{ node_failing: filterFailedNodes }}
          />
        )}
      </div>
    </div>
  );
});

export default InfoRightNode;
