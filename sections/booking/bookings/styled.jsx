import styled from "styled-components";
import { Flex } from "@rebass/grid";

export const ColumnsWrapper = styled(Flex).attrs(() => ({
  mx: -2
}))``;

export const TablesWrapper = styled(Flex).attrs(() => ({
  mx: -2,
  flexWrap: "wrap",
  width: "calc(100% - 200px)"
}))``;
