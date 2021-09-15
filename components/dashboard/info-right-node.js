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
    }
    .col-2 {
      width: 85%;
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
      return 'highlight';
    }
    if (isAdmin && row.is_fail_node) {
      return 'fail-node';
    }
    if (
      isAdmin &&
      hightlightNode?.public_address_node === row.public_address_node
    ) {
      return 'highlight';
    }
    return '';
  };

  return (
    <Styles className="h-full w-full text-base font-thin">
      <Table
        {...register}
        className="nodes-table w-full h-full min-w-full"
        onLoadMore={getNodes}
        hasMore={hasMore}
        dataLength={data.length}
      >
        <Table.Header>
          <Table.HeaderCell />
          <Table.HeaderCell />
        </Table.Header>
        <Table.Body>
          {data.map((row, ind) => (
            <Table.BodyRow
              key={ind}
              className={`custom-row ${renderClass(row)}`}
            >
              <Table.BodyCell>
                <p>{ind + 1}</p>
              </Table.BodyCell>
              <Table.BodyCell>
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
    <div className="flex gap-5 flex-col bg-white h-full">
      <div className="flex lg:hidden flex-col mt-2 mx-5 pb-8 border-b-2 border-gray h-1/10">
        <div className="flex">
          <span className="text-lg font-normal">Node Name</span>
          <img className="pl-3" src="/images/ic_feather_info.svg" alt="Info" />
        </div>
        <div className="flex">
          <span className="text-base font-thin overflow-hidden overflow-ellipsis">
            0x961d61792ca1c5e08a3cec4261e08ef4eaea5b5d
          </span>
          <img className="pl-3" src="/images/ic_down.svg" alt="Info" />
        </div>
      </div>
      <div className="flex flex-col lg:pb-3 h-9/10 lg:h-full">
        <div className="flex gap-1">
          <span className="text-lg font medium lg:font-normal">Node Rank</span>
          <Tooltips
            placement="top"
            title="Ranks all nodes in the platform weighted equally."
            arrow
          >
            <img src="/images/ic_feather_info.svg" alt="Info" />
          </Tooltips>
          {!!isAdmin && (
            <div className="ml-auto flex items-center px-4">
              <span className="pr-2">Only Failing</span>
              <Switch
                id="status"
                checked={filterFailedNodes}
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
