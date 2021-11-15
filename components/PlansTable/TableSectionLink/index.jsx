import React from "react";
import { shape, string } from "prop-types";

import { SectionLink } from "./styled";
import { Cell, Row } from "../styled";

const TableSectionLink = ({ link: { label } }) => (
  <Row>
    <Cell>
      <SectionLink>{label}</SectionLink>
    </Cell>
    <Cell />
    <Cell />
    <Cell />
  </Row>
);

TableSectionLink.propTypes = {
  link: shape({
    label: string.isRequired,
    href: string.isRequired
  }).isRequired
};

export default TableSectionLink;
