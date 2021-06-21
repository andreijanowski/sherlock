import React from "react";
import { string, number } from "prop-types";
import { DataCell, RedText, TableRow } from "./styled";

const ImportErrorsTableRow = ({ index, row, error }) => (
  <TableRow>
    <DataCell>
      <RedText>{index}</RedText>
    </DataCell>
    <DataCell>{row}</DataCell>
    <DataCell isError>{error}</DataCell>
  </TableRow>
);

ImportErrorsTableRow.propTypes = {
  index: number.isRequired,
  row: string.isRequired,
  error: string.isRequired
};

export default ImportErrorsTableRow;
