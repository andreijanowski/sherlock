import styled from "styled-components";
import { Flex } from "@rebass/grid";

export const Wrapper = styled(Flex).attrs(() => ({
  p: [3, 4],
  width: 1,
  flexDirection: "column"
}))`
  background-color: rgb(${p => p.theme.colors.white});
  border-radius: ${p => p.theme.radius.default};
  box-shadow: 0 2px 6px 0 rgba(${p => p.theme.colors.blue}, 0.08);
`;

export const SuccesWrapper = styled(Wrapper).attrs(() => ({
  justifyContent: "center",
  flexDirection: "column",
  alignItems: "center",
  p: [3, 4]
}))`
  min-height: 100%;
`;
