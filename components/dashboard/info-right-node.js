import React, { useState, useEffect, useRef, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { getNodesFromAdmin } from '../../shared/redux-saga/admin/actions';
import Table, { useTable } from '../partials/table';
import { getShortNodeAddress } from '../../shared/core/utils';
import { Tooltips } from '../partials';
import useMetrics from '../hooks/useMetrics';

const Styles = styled.div`
  .nodes-table {
    display: flex;
    flex-direction: column;
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

const NodesList = ({ userInfo, nodesInfo, isAdmin, hightlightNode }) => {
  // const dispatch = useDispatch();
  const { data, setData, hasMore, appendData, setHasMore, register } =
    useTable();
  const renderDone = useRef();

  /*
  const getNodes = (pageValue = page, limit = 20) => {
    if (isAdmin) {
      dispatch(
        getNodesFromAdmin({ page: pageValue, limit }, (result, isHasMore) => {
          setHasMore(isHasMore);
          appendData(result);
          setPage(prev => prev + 1);
          renderDone.current = true;
        })
      );
    }
  };
  */

  /*
  useEffect(() => {
    resetData();
    getNodes(1);
  }, []);
  */

  useEffect(() => {
    if (nodesInfo && Object.keys(nodesInfo).length > 0) {
      setData([]);
      const items = Object.keys(nodesInfo.ranking || {}) || [];
      setHasMore(false);
      appendData(items);
      renderDone.current = true;
    }
  }, [nodesInfo]);

  const renderClass = row => {
    if (hightlightNode && hightlightNode?.public_address_node === row) {
      return 'custom-highlight';
    }
    if (
      !isAdmin &&
      (!hightlightNode || !hightlightNode.public_address_node) &&
      userInfo.public_address_node === row
    ) {
      return 'custom-highlight';
    }
    return '';
  };

  return (
    <Styles className="w-full h-full text-base font-thin">
      <Table
        {...register}
        className="nodes-table pl-7px"
        onLoadMore={() => {}}
        hasMore={hasMore}
        dataLength={data.length}
        noMargin
      >
        <Table.Header>
          <Table.HeaderCell key="emptyHeader1" />
          <Table.HeaderCell key="emptyHeader2" />
        </Table.Header>
        <Table.Body className="custom-padding-tracker">
          {data.map((row, ind) => (
            <Table.BodyRow
              key={ind}
              className={`px-3 custom-row ${renderClass(row)}`}
            >
              <Table.BodyCell key="index">
                <p>{ind + 1}</p>
              </Table.BodyCell>
              <Table.BodyCell key="tooltips">
                <p className="truncate inset-0">
                  {getShortNodeAddress(row, 20)}
                </p>
              </Table.BodyCell>
            </Table.BodyRow>
          ))}
        </Table.Body>
      </Table>
    </Styles>
  );
};

const InfoRightNode = memo(({ nodesInfo, currentNode }) => {
  const userInfo = useSelector(state => state.authReducer.userInfo.fullInfo);
  const [isAdmin, setIsAdmin] = useState(null);
  const { metrics } = useMetrics();

  useEffect(() => {
    if (userInfo) {
      const isAdminTemp = ['admin', 'sub-admin'].includes(userInfo?.role);
      setIsAdmin(isAdminTemp);
    }
  }, [userInfo]);

  return (
    <div className="bg-white">
      <div className="flex flex-col w-full h-full">
        <div className="pl-3 flex gap-2">
          <span className="text-lg font-normal">Registered Node Rankings</span>
          <Tooltips
            placement="top"
            title={
              <>
                <p>
                  Ranks all nodes in the platform - based on uptime, fee,
                  responsiveness, delegator count, and stake amount, all sharing
                  equally weighted importance.
                </p>
                <p>
                  {!isAdmin && metrics?.rank
                    ? `Your Registered Node Ranking: ${metrics?.rank} out of ${metrics?.totalCount}`
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
        {isAdmin !== null && (
          <NodesList
            hightlightNode={currentNode}
            userInfo={userInfo}
            nodesInfo={nodesInfo}
            isAdmin={isAdmin}
          />
        )}
      </div>
    </div>
  );
});

export default InfoRightNode;
