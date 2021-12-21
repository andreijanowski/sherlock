import styled from "styled-components";

import { downThanBreakpoint, LANDING_BLOCK_ANGLE, themeGet } from "utils/theme";

export const TopSectionWrapper = styled.div`
  width: 100%;
  background: linear-gradient(
    ${LANDING_BLOCK_ANGLE},
    rgb(${themeGet("colors.darkBlue")}) calc(70% - 1px),
    rgb(${themeGet("colors.white")}) 70%
  );
  ${downThanBreakpoint(2)} {
    background: rgb(${themeGet("colors.darkBlue")});
  }
`;
