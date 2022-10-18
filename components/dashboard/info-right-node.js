import React, { useEffect, useRef, memo } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import InfoIcon from '@material-ui/icons/Info';
import Table, { useTable } from '../partials/table';
import { getShortNodeAddress } from '../../shared/core/utils';
import { Tooltips } from '../partials';

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
  const { data, setData, hasMore, appendData, setHasMore, register } =
    useTable();
  const renderDone = useRef();

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
    <Styles className="w-full text-base font-thin">
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

const InfoRightNode = memo(({ isAdmin, nodesInfo, currentNode }) => {
  const userInfo = useSelector(state => state.authReducer.userInfo.fullInfo);

  const getCurrentRanking = () => {
    if (
      currentNode &&
      currentNode.public_address_node &&
      nodesInfo &&
      nodesInfo.ranking
    ) {
      return nodesInfo.ranking[currentNode.public_address_node] || 0;
    }
    return 5;
  };

  const getTotalRanking = () => {
    if (nodesInfo && nodesInfo.ranking) {
      return Object.keys(nodesInfo.ranking).length;
    }
    return 0;
  };

  return (
    <div className="bg-white">
      <div className="flex flex-col w-full">
        <div className="pl-3 flex items-center gap-2">
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
                  Registered Node Ranking: {getCurrentRanking()} out of{' '}
                  {getTotalRanking()}
                </p>
              </>
            }
            arrow
          >
            <InfoIcon style={{ color: 'black', fontSize: '16px' }} />
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
