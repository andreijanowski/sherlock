import styled from "styled-components";

export const TableContainer = styled.div`
  max-width: 100%;
  overflow: auto;
`;

export const Table = styled.table`
  width: 100%;
  min-width: 960px;
  table-layout: fixed;
  border-collapse: collapse;
`;

export const Row = styled.tr``;

export const Cell = styled.td`
  &:first-child {
    font-size: ${p => p.theme.fontSizes.f18};
    line-height: ${p => p.theme.fontSizes.f27};
    font-weight: ${p => p.theme.fontWeights.bold};
  }
  background-color: ${p => p.isHeading && "#F1F4FE"};
  padding: ${p => (p.isHeading ? "30px 20px" : "8px 20px")};
  color: rgb(
    ${p => (p.isBlue ? p.theme.colors.navyBlue : p.theme.colors.darkText)}
  );
`;
