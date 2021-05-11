import styled from "styled-components";

export const Tr = styled.tr`
  & td {
    text-align: center;
  }

  & .icon {
    color: #5479fa;
    display: inline-block;
    height: 1.5em;
    position: relative;
    width: 1.5em;

    & svg {
      height: 3.4375em;
      left: -65%;
      position: absolute;
      top: -50%;
      width: 3.4375em;
    }
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

export const SvgIconWrap = styled.span`
  display: inline-block;
  height: ${p => p.height || "1em"};
  width: ${p => p.width || "1em"};
`;
