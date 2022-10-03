import { useCallback, useRef } from "react";
import { useTable, useBlockLayout } from "react-table";
import { FixedSizeList } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import { LoadingIndicator } from "components";
import { bool, shape, func } from "prop-types";
import {
  TableWrapper,
  TableHeader,
  TableBody,
  TableRow,
  TableCell
} from "./styled";

const Table = ({
  loading,
  columns,
  data,
  toggleOrderDetails,
  hasNextPage,
  isNextPageLoading,
  loadNextPage
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    totalColumnsWidth,
    prepareRow
  } = useTable(
    {
      columns,
      data
    },
    useBlockLayout
  );

  const listRef = useRef(null);
  const itemCount = hasNextPage ? rows.length + 1 : rows.length;
  const loadMoreItems = isNextPageLoading ? () => {} : loadNextPage;
  const isItemLoaded = useCallback(
    index => !hasNextPage || index < rows.length,
    [hasNextPage, rows.length]
  );

  const RenderRow = useCallback(
    ({ index, style }) => {
      if (!isItemLoaded(index)) {
        return (
          <TableRow style={style}>
            <TableCell>
              <LoadingIndicator hasTransparentBackground />
            </TableCell>
          </TableRow>
        );
      }
      const row = rows[index];
      prepareRow(row);
      return (
        <TableRow
          {...row.getRowProps({
            style
          })}
          onClick={() => toggleOrderDetails(row.original.id)}
        >
          {row.cells.map(cell => (
            <TableCell {...cell.getCellProps()}>
              {cell.render("Cell")}
            </TableCell>
          ))}
        </TableRow>
      );
    },
    [isItemLoaded, prepareRow, rows, toggleOrderDetails]
  );

  return (
    <TableWrapper {...getTableProps()}>
      <TableHeader>
        {headerGroups.map(headerGroup => (
          <TableRow {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <TableCell {...column.getHeaderProps()}>
                {column.render("Header")}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableHeader>

      {loading || !data ? (
        <LoadingIndicator hasTransparentBackground />
      ) : (
        <TableBody {...getTableBodyProps()}>
          <InfiniteLoader
            ref={listRef}
            isItemLoaded={isItemLoaded}
            itemCount={itemCount}
            loadMoreItems={loadMoreItems}
          >
            {({ onItemsRendered, ref }) => (
              <FixedSizeList
                height={420}
                itemCount={itemCount}
                itemSize={35}
                ref={ref}
                onItemsRendered={onItemsRendered}
                width={totalColumnsWidth}
              >
                {RenderRow}
              </FixedSizeList>
            )}
          </InfiniteLoader>
        </TableBody>
      )}
    </TableWrapper>
  );
};

Table.propTypes = {
  loading: bool.isRequired,
  columns: shape().isRequired,
  data: shape().isRequired,
  toggleOrderDetails: func.isRequired,
  hasNextPage: bool.isRequired,
  isNextPageLoading: bool.isRequired,
  loadNextPage: func.isRequired
};

export default Table;
