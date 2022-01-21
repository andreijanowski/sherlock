import styled from "styled-components";
import { Flex, Box } from "@rebass/grid";

import { downThanBreakpoint, themeGet } from "utils/theme";

export const Container = styled(Flex)`
  @media (max-width: 1330px) {
    flex-wrap: wrap;
  }
`;

export const LinksGroupTitle = styled(Box)`
  font-weight: 600;
  font-size: 18px;
  line-height: 25px;
  color: rgb(${themeGet("colors.b2bSecondary")});
  ${downThanBreakpoint(2)} {
    text-align: center;
  }
`;
