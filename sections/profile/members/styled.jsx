import styled from "styled-components";
import { Flex } from "@rebass/grid";

export const Wrapper = styled(Flex).attrs({
  width: 1,
  alignItems: "center",
  justifyContent: "space-between"
})`
  position: relative;
`;

export const Inputs = styled(Flex).attrs({
  width: "calc(100% - 96px)"
})``;
