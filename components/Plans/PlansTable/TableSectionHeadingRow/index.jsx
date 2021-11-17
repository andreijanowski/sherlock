import React from "react";

import { SectionTitle } from "./styled";
import { Cell, Row } from "../styled";
import { tablePartShape } from "../types";

const TableSectionHeadingRow = ({ tablePart: { heading } }) => (
  <Row>
    <Cell isHeading colSpan={4}>
      <SectionTitle>{heading}</SectionTitle>
    </Cell>
  </Row>
);

TableSectionHeadingRow.propTypes = {
  tablePart: tablePartShape.isRequired
};

export default TableSectionHeadingRow;
