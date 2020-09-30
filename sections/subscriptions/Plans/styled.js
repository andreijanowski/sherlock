import styled from "styled-components";
import { Flex } from "@rebass/grid";

export const PlansWrapper = styled(Flex).attrs(() => ({
  flexDirection: "row",
  flexWrap: "wrap",
  m: -2,
  width: 1,
  alignSelf: "center",
  justifyContent: "center"
}))`
  max-width: 1150px;
`;
