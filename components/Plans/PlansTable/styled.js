import styled from "styled-components";
import { Box } from "@rebass/grid";

const getTableBorder = p => `2px dashed rgb(${p.theme.colors.tableBorder})`;

export const TableContainer = styled.div`
  max-width: 100%;
  overflow: auto;
  @media (max-width: 960px) {
    overflow-y: scroll;
  }
`;

export const Table = styled.table`
  width: 100%;
  min-width: 960px;
  table-layout: fixed;
  border-collapse: collapse;
  border: ${getTableBorder};
`;

export const Row = styled.tr``;

export const Cell = styled(Box).attrs(p => ({
  as: "td",
  p: p.isHeading ? "30px 20px" : "8px 20px"
}))`
  &:first-child {
    font-size: ${p => p.theme.fontSizes.f18};
    line-height: ${p => p.theme.fontSizes.f27};
    font-weight: ${p => p.theme.fontWeights.bold};
  }
  border-bottom: ${getTableBorder};
  :not(:first-child) {
    text-align: center;
    border-right: ${getTableBorder};
  }
  background-color: ${p => p.isHeading && "#F1F4FE"};
  color: rgb(
    ${p => (p.isBlue ? p.theme.colors.navyBlue : p.theme.colors.darkText)}
  );
`;
