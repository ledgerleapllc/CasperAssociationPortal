import { cloneElement } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import ReactLoading from 'react-loading';

const Table = props => (
  <div className={`${props.className} flex flex-col min-w-250`}>
    {props.children[0]}
    {cloneElement(props.children[1], {
      onLoadMore: props.onLoadMore,
      hasMore: props.hasMore,
      dataLength: props.dataLength,
      height: props.height,
    })}
  </div>
);

Table.Header = props => (
  <div className="flex w-full">
    {props.children.map((child, i) =>
      cloneElement(child, {
        index: i + 1,
      })
    )}
  </div>
);

Table.HeaderCell = props => (
  <div className={`col col-${props.index} text-base font-medium`}>
    {props.children}
  </div>
);

Table.Header.Cell = Table.HeaderCell;

Table.Body = props => (
  <InfiniteScroll
    className="flex flex-col w-full mt-5"
    dataLength={props.dataLength || 0}
    next={props.onLoadMore}
    hasMore={props.hasMore}
    loader={
      <div className="py-4 flex justify-center">
        <ReactLoading
          type="spinningBubbles"
          color="#FF473E"
          width={30}
          height={30}
        />
      </div>
    }
    height={props.height}
    scrollThreshold={0.99}
  >
    {props.dataLength ? (
      props.children
    ) : !props.hasMore ? (
      <p className="py-4 text-center opacity-40">No Results Found</p>
    ) : (
      <></>
    )}
  </InfiniteScroll>
);

Table.BodyRow = props => (
  <div className="flex items-center flex-row w-full py-2.5 border-b border-gray">
    {props.children.map((child, i) =>
      cloneElement(child, {
        index: i + 1,
      })
    )}
  </div>
);

Table.BodyCell = props => (
  <div className={`col col-${props.index} text-sm`}>{props.children}</div>
);

Table.Body.Cell = Table.BodyCell;
Table.Body.Row = Table.BodyRow;

export default Table;
