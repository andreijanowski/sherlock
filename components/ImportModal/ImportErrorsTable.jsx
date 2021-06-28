import React from "react";
import { func, shape, arrayOf, string, number } from "prop-types";

import ImportErrorsTableRow from "./ImportErrorsTableRow";
import { HeaderCell, Table, TableRow } from "./styled";
import { extractErrorData } from "./utils";

const ImportErrorsTable = ({ t, data }) => (
  <Table>
    <thead>
      <TableRow>
        <HeaderCell>#</HeaderCell>
        <HeaderCell>{t("lefood:import.table.row")}</HeaderCell>
        <HeaderCell isError>{t("lefood:import.table.error")}</HeaderCell>
      </TableRow>
    </thead>
    <tbody>
      {data.map((error, index) => (
        <ImportErrorsTableRow {...extractErrorData(error, index, t)} />
      ))}
    </tbody>
  </Table>
);

ImportErrorsTable.propTypes = {
  t: func.isRequired,
  data: arrayOf(
    shape({
      code: string.isRequired,
      detail: string.isRequired,
      meta: shape().isRequired,
      status: number.isRequired,
      title: string.isRequired
    })
  ).isRequired
};

export default ImportErrorsTable;
