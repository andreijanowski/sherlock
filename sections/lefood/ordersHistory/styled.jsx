import styled from "styled-components";
import { Flex, Box } from "@rebass/grid";

export const Wrapper = styled(Flex).attrs({
  justifyContent: "space-around",
  flexDirection: [
    "column-reverse",
    "column-reverse",
    "column-reverse",
    "column-reverse",
    "row"
  ]
})`
  position: relative;
  min-height: 457px;
`;

export const TableWrapper = styled(Flex).attrs({
  flexDirection: "column",
  alignSelf: "center",
  width: [1, 1, 620]
})`
  position: relative;
  min-height: 457px;
  overflow: hidden;
  color: rgb(${p => p.theme.colors.dark});
  font-weight: ${p => p.theme.fontWeights.regular};
  background-color: ${p => `rgb(${p.theme.colors.white})`};
  border: 1px solid rgb(${p => p.theme.colors.linkWater});
  border-radius: ${p => p.theme.radius.default};
  box-shadow: 0 2px 6px 0 rgba(${p => p.theme.colors.blue}, 0.08);
`;

export const TableHeader = styled(Flex).attrs({ justifyContent: "center" })``;

export const TableBody = styled(Flex).attrs({ justifyContent: "center" })``;

export const TableRow = styled(Flex).attrs({
  alignItems: "center",
  justifyContent: "center"
})`
  height: 35px;
  border-bottom: 1px solid rgb(${p => p.theme.colors.linkWater});
  cursor: pointer;
  &:hover {
    color: rgb(${p => p.theme.colors.white});
    background-color: rgb(${p => p.theme.colors.blue});
  }
`;

export const TableCell = styled(Box)`
  text-align: center;
`;

export const FiltersForm = styled(Flex).attrs({
  flexDirection: ["column", "column", "row", "row", "column"],
  as: "form",
  alignItems: ["normal", "normal", "center", "center", "normal"],
  justifyContent: ["start", "start", "space-around", "space-around", "start"],
  width: [1, 1, 1, 1, "calc(100% - 700px)"]
})``;
