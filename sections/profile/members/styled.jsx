import styled from "styled-components";
import { Flex } from "@rebass/grid";

export const Wrapper = styled(Flex).attrs({
  width: 1,
  alignItems: "center",
  justifyContent: "space-between",
  flexWrap: "wrap"
})`
  position: relative;
`;
