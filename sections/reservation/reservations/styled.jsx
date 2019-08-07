import styled from "styled-components";
import { Flex } from "@rebass/grid";

export const ColumnsWrapper = styled(Flex).attrs(() => ({
  mx: -2,
  alignItems: "flex-start"
}))``;

export const TablesWrapper = styled(Flex).attrs(() => ({
  mx: -2,
  flexWrap: "wrap",
  width: "calc(100% - 250px)"
}))`
  position: relative;
`;
