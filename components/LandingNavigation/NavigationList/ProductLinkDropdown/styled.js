import styled from "styled-components";
import { Flex, Box } from "@rebass/grid";

import { downThanBreakpoint, themeGet } from "utils/theme";

export const Container = styled(Flex)`
  @media (max-width: 1024px) {
    flex-wrap: wrap;
  }
`;

export const LinksGroupTitle = styled(Box)`
  font-weight: 600;
  font-size: 14px;
  line-height: 25px;
  color: rgb(${themeGet("colors.mischka")});
  ${downThanBreakpoint(2)} {
    text-align: center;
  }
`;
