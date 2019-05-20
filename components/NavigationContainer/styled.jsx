import styled from "styled-components";
import { Flex } from "@rebass/grid";

export const Wrapper = styled(Flex)`
  display: none;
  @media (min-width: ${p => p.theme.breakpoints[0]}) {
    display: flex;
  }
`;

export const MobileWrapper = styled(Flex)`
  position: fixed;
  z-index: 10;
  width: 100vw;
  height: 60px;
  background-color: rgb(${p => p.theme.colors.dark});
  @media (min-width: ${p => p.theme.breakpoints[0]}) {
    display: none;
  }
`;
