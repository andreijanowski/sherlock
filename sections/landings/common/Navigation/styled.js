import styled from "styled-components";
import { Flex } from "@rebass/grid";
import { downThanBreakpoint, WRAPPER_WIDTH } from "utils/theme";

export const Header = styled(Flex).attrs({ as: "header" })`
  flex-direction: column;
  max-width: ${WRAPPER_WIDTH}px;
  margin: auto;
  width: 100%;
  position: relative;
  ${downThanBreakpoint(2)} {
    ${p =>
      p.isMenuOpened &&
      `
      position: fixed;
      top: 0;
      left: 0;
      bottom: 0;
      z-index: 1;
    `}
  }
`;
