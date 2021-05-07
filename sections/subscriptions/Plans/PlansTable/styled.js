import styled from "styled-components";

export const Description = styled.div`
  position: relative;
`;

export const DescriptionInner = styled.div`
  font-size: 0.9375em;
  font-weight: normal;
  left: 0;
  line-height: 1.334;
  position: absolute;
  text-align: left;
  top: 3.4em;
  width: 100%;
`;

export const Explain = styled.p`
  color: #828282;
  font-size: 0.75em;
  font-style: italic;
  margin: 0.833em 0 0;
`;

export const Table = styled.table`
  border-spacing: 0;
  width: 100%;

  & td,
  & th {
    border: 2px dashed #f2f2f2;
    border-right: 0 none;
  }

  & td {
    padding: 0.3125em 1.25em;
  }

  & th {
    border-top: 0 none;
    padding: 1.25em 0.5625em;
  }

  & th:first-child,
  & td:first-child {
    border-left: 0 none;
    vertical-align: middle;
  }

  & th:first-child {
    font-size: 1.125em;
    padding-left: 0;
    text-align: left;
  }
`;

export const Wrap = styled.div`
  overflow-x: scroll;
  padding: 0 0 0.5em;
`;
