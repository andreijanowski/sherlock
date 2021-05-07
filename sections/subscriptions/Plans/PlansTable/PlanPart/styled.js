import styled from "styled-components";

export const Tr = styled.tr`
  & td {
    text-align: center;
  }

  & .label {
    color: #828282;
    text-align: left;
  }

  & .planPartCell {
    border-left: 0 none;
    border-right: 2px dashed #f2f2f2;
    border-top: 0;

    &.free {
      color: #4f4f4f;
    }
    &.essential {
      color: #333;
    }
    &.premium {
      color: #4c68ff;
    }
  }
`;

export const TrHead = styled.tr`
  font-size: 0.875em;
  font-weight: bold;

  & .cell {
    border-right: 2px dashed #f2f2f2;
    border-top: 0 none;
    padding: 1.2em 0;
  }
`;
