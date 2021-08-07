import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { getActivePerks } from '../../../../shared/redux-saga/admin/actions';
import { useTable } from '../../../partials/table';
import { Table } from '../../../partials';
import { PerkCard } from '../components/perk-card';

const Perks = styled.div`
  .perks-preview-table {
    .col-1 {
      width: 0%;
    }
    .col-2 {
      width: 100%;
    }
    .perk-preview-record {
      width: 50%;
      border: 0;
    }
    .table-header {
      padding-bottom: 0;
    }
    .infinite-scroll-component {
      flex-direction: row;
      flex-wrap: wrap;
    }
    .no-result-text,
    .loading-data {
      width: 100%;
    }
  }
`;

export const PerksPreview = () => {
  const dispatch = useDispatch();
  const {
    data,
    params,
    register,
    hasMore,
    appendData,
    setHasMore,
    page,
    setPage,
  } = useTable();

  const fetchActivePerks = (pageValue = page, paramsValue = params) => {
    dispatch(
      getActivePerks(
        { page: pageValue, ...paramsValue },
        (results, isHasMore) => {
          setHasMore(isHasMore);
          appendData(results);
          setPage(prev => prev + 1);
        }
      )
    );
  };

  useEffect(() => {
    fetchActivePerks();
  }, []);

  return (
    <Perks className="h-full">
      <Table
        {...register}
        className="perks-preview-table h-full"
        onLoadMore={fetchActivePerks}
        hasMore={hasMore}
        dataLength={data.length}
      >
        <Table.Header>
          <Table.HeaderCell />
          <Table.HeaderCell />
        </Table.Header>
        <Table.Body className="lg:-ml-5 lg:-mr-card lg:pr-card">
          {data.map((row, index) => (
            <Table.BodyRow className="perk-preview-record" key={`b-${index}`}>
              <Table.BodyCell />
              <Table.BodyCell>
                <PerkCard perk={row} />
              </Table.BodyCell>
            </Table.BodyRow>
          ))}
        </Table.Body>
      </Table>
    </Perks>
  );
};
