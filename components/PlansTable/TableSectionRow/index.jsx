import React from "react";

import { Row } from "../styled";
import { rowShape } from "../types";
import TablePrimaryCell from "../TablePrimaryCell";
import TableColumnCell from "../TableColumnCell";

const TableSectionRow = ({ row }) => (
  <Row>
    <TablePrimaryCell row={row} />
    {row.columns.map((col, index) => (
      <TableColumnCell
        // structure will be static, so we can use index as key
        // eslint-disable-next-line react/no-array-index-key
        key={index}
        col={col}
        isBlue={index % 2 !== 0}
      />
    ))}
  </Row>
);

TableSectionRow.propTypes = {
  row: rowShape.isRequired
};

export default TableSectionRow;
