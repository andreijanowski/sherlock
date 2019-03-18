import styled from "styled-components";
import { Flex } from "@rebass/grid";

export const Wrapper = styled(Flex).attrs({
  flexDirection: "column"
})`
  display: none;
  @media (min-width: ${p => p.theme.breakpoints[0]}) {
    display: flex;
  }
`;

export const MobileWrapper = styled(Flex)`
  position: fixed;
  width: 100vw;
  z-index: 10;
  height: 60px;
  background-color: rgb(${p => p.theme.colors.dark});
  @media (min-width: ${p => p.theme.breakpoints[0]}) {
    display: none;
  }
`;
