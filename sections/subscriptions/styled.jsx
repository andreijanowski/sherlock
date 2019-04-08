import styled from "styled-components";
import { Flex } from "@rebass/grid";

export const Wrapper = styled(Flex).attrs({
  p: [3, 4],
  width: 1,
  flexDirection: "column"
})`
  border-radius: ${p => p.theme.radius.default};
  background-color: rgb(${p => p.theme.colors.white});
  box-shadow: 0 2px 6px 0 rgba(${p => p.theme.colors.blue}, 0.08);
`;

export const SuccesWrapper = styled(Wrapper).attrs({
  justifyContent: "center",
  flexDirection: "column",
  alignItems: "center",
  p: [3, 4]
})`
  min-height: 100%;
`;
