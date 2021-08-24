/* eslint-disable no-bitwise */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import {
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import ReactLoading from 'react-loading';
import styled from 'styled-components';

const DIRECTION = {
  0: 'asc',
  1: 'desc',
};

const Styles = styled.span`
  margin-left: 10px;
  margin-top: 6px;
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  ${props => {
    if (props.direction === 'desc') {
      return `border-top: 7px solid black;`;
    }
    if (props.direction === 'asc') {
      return `border-bottom: 7px solid black;`;
    }
  }}
`;

const TableContext = createContext({});

const ArrowSort = ({ direction }) => <Styles direction={direction} />;

const Table = props => {
  const [sortKey, setSortKey] = useState();
  const [sortDirection, setSortDirection] = useState();
  const [randomId] = useState(Math.random().toString(36).substring(7));

  useEffect(() => {
    if (
      sortKey &&
      sortDirection >= 0 &&
      props.onSort &&
      typeof props.onSort === 'function'
    ) {
      props.onSort(sortKey, DIRECTION[sortDirection]);
    }
  }, [sortKey, sortDirection]);

  useEffect(() => {
    if (props.register && typeof props.register === 'function') {
      props.register(randomId);
    }
  }, []);

  return (
    <TableContext.Provider
      value={{ sortKey, setSortKey, sortDirection, setSortDirection, randomId }}
    >
      <div className={`${props.className} flex flex-col min-w-250 text-sm`}>
        {props.children[0]}
        {cloneElement(props.children[1], {
          onLoadMore: props.onLoadMore,
          hasMore: props.hasMore,
          dataLength: props.dataLength,
          height: props.height,
        })}
      </div>
    </TableContext.Provider>
  );
};

Table.Header = props => (
  <div
    className="table-header flex w-full pb-2"
    style={{ paddingRight: '7px' }}
  >
    {props.children.map((child, i) =>
      cloneElement(child, {
        index: i + 1,
      })
    )}
  </div>
);

Table.HeaderCell = props => {
  const { sortKey, setSortKey, sortDirection, setSortDirection } = useContext(TableContext);
  const [pendingSort, setPendingSort] = useState(false);
  const triggerSort = () => {
    if (props.sortKey) {
      setPendingSort(true);
      setSortKey(props.sortKey);
      setSortDirection(sortDirection ^ 1);
      setTimeout(() => setPendingSort(false), 1500);
    }
  };

  return (
    <div
      className={`
        ${props.className || ''} 
        col col-${props.index} 
        text-sm`}
    >
      <button
        type="button"
        className="text-left font-semibold focus:outline-none flex cursor-pointer disabled:cursor-not-allowed"
        onClick={triggerSort}
        disabled={pendingSort}
      >
        {props.children}
        {props.sortKey && sortKey === props.sortKey && (
          <ArrowSort direction={DIRECTION[sortDirection]} />
        )}
      </button>
    </div>
  );
};

Table.Header.Cell = Table.HeaderCell;

Table.Body = props => {
  const { randomId } = useContext(TableContext);

  return (
    <div
      id={randomId}
      className={`table-body ${props.className || ''}`}
      style={{ overflowY: 'scroll' }}
    >
      <InfiniteScroll
        className="flex flex-col w-full"
        style={{ marginRight: '-7px' }}
        dataLength={props.dataLength || 0}
        next={props.onLoadMore}
        hasMore={props.hasMore}
        loader={
          <div className="py-4 flex justify-center loading-data">
            <ReactLoading
              type="spinningBubbles"
              color="#FF473E"
              width={30}
              height={30}
            />
          </div>
        }
        scrollableTarget={randomId}
        scrollThreshold={0.99}
      >
        {props.dataLength ? (
          props.children
        ) : !props.hasMore ? (
          <p className="py-4 text-center opacity-40 no-result-text">
            No Results Found
          </p>
        ) : (
          <></>
        )}
      </InfiniteScroll>
    </div>
  );
};

Table.BodyRow = props => {
  const doSelectRow = () => {
    if (
      props.selectRowHandler &&
      typeof props.selectRowHandler === 'function'
    ) {
      props.selectRowHandler();
    }
  };

  return (
    <div
      className={`${
        props.className
      } flex items-center flex-row w-full py-2 border-b border-gray1 ${
        props.selectRowHandler ? 'cursor-pointer' : ''
      }`}
      onClick={doSelectRow}
    >
      {props.children.map((child, i) =>
        cloneElement(child, {
          index: i + 1,
        })
      )}
    </div>
  );
};

Table.BodyCell = props => (
  <div className={`col col-${props.index} pr-5`}>{props.children}</div>
);

Table.Body.Cell = Table.BodyCell;
Table.Body.Row = Table.BodyRow;

export const useTable = () => {
  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [params, setParams] = useState({});
  const [tableId, setTableId] = useState();

  const appendData = (res, reverse = false) => {
    if (reverse) {
      setData(prevData => [...res, ...prevData]);
    } else {
      setData(prevData => [...prevData, ...res]);
    }
  };

  const getTableId = id => {
    setTableId(id);
  };

  const resetData = () => {
    const $table = document.getElementById(tableId);
    if ($table) {
      $table.classList.add('opacity-0');
      $table.scrollTop = 0;
      setTimeout(() => {
        setData([]);
        setPage(1);
        setHasMore(true);
        $table.classList.remove('opacity-0');
      }, 50);
    }
  };

  return {
    data,
    setData,
    register: { register: getTableId },
    hasMore,
    page,
    appendData,
    resetData,
    setHasMore,
    setPage,
    params,
    setParams,
  };
};

export default Table;
