import React from "react";
import { node } from "prop-types";
import Tippy from "@tippyjs/react";

import { CircleWarningIcon } from "components/Icons";
import { TableHintContainer, TableHintIcon, TableHintPopper } from "./styled";

const TableHint = ({ children }) => (
  <Tippy
    arrow={false}
    offset={[26, -32]}
    placement="right-start"
    maxWidth="400"
    content={<TableHintPopper>{children}</TableHintPopper>}
  >
    <TableHintContainer>
      <TableHintIcon>
        <CircleWarningIcon />
      </TableHintIcon>
    </TableHintContainer>
  </Tippy>
);

TableHint.propTypes = {
  children: node.isRequired
};

export default TableHint;
