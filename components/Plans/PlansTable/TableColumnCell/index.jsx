import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { bool } from "prop-types";

import { Container, Label } from "./styled";
import { columnShape } from "../types";
import { Cell } from "../styled";
import TableHint from "../TableHint";

const TableColumnCell = ({
  col: { isAvailable, label, renderHint },
  isBlue
}) => (
  <Cell isBlue={isBlue}>
    <Container>
      {label && (
        <Label>
          {label}
          {renderHint && <TableHint>{renderHint()}</TableHint>}
        </Label>
      )}
      {!label && (isAvailable ? <FontAwesomeIcon icon={faCheck} /> : null)}
    </Container>
  </Cell>
);

TableColumnCell.propTypes = {
  col: columnShape.isRequired,
  isBlue: bool.isRequired
};

export default TableColumnCell;
