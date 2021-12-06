import styled from "styled-components";
import { Flex } from "@rebass/grid";

import { downThanBreakpoint, themeGet } from "utils/theme";

export const Container = styled(Flex)`
  width: 100%;
  justify-content: space-between;
  align-items: center;
  ${downThanBreakpoint(2)} {
    border-bottom: 1px solid rgb(${themeGet("colors.white")});
    color: rgb(
      ${p => themeGet(p.isMenuOpened ? "colors.black" : "colors.white")}
    );
    background-color: ${p =>
      p.isMenuOpened && `rgb(${themeGet("colors.white")})`};
  }
`;
