import { Flex } from "@rebass/grid";
import styled from "styled-components";

export const Wrapper = styled(Flex).attrs(() => ({
  px: [3, 4],
  pt: [3, 4],
  pb: [null, 3],
  flexWrap: "wrap",
  justifyContent: "space-between"
}))`
  background-color: rgb(${p => p.theme.colors.white});
  border-radius: ${p => p.theme.radius.default};
  box-shadow: 0 2px 6px 0 rgba(${p => p.theme.colors.blue}, 0.08);
`;

export const NoPartners = styled(Flex)`
  height: 200px;
`;
