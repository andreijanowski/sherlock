import styled from "styled-components";
import { Box, Flex } from "@rebass/grid";

export const ActionBarWrapper = styled(Flex)`
  position: relative;
  @media (min-width: ${p => p.theme.breakpoints[0]}) {
    position: static;
  }
`;

export const AddIconWrapper = styled(Box)`
  position: absolute;
  top: -66px;
  right: 0;
  @media (min-width: ${p => p.theme.breakpoints[0]}) {
    position: static;
  }
`;
