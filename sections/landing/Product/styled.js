import styled from "styled-components";
import { Flex, Box } from "@rebass/grid";

import { downThanBreakpoint, WRAPPER_WIDTH } from "utils/theme";
import { Subtitle as BaseSubtitle } from "components/styleguide/Typography";

export const Container = styled(Box)`
  max-width: ${WRAPPER_WIDTH}px;
  margin: auto;
`;

export const Subtitle = styled(BaseSubtitle)`
  font-weight: ${p => p.theme.fontWeights.medium};
`;

export const Column = styled(Flex)`
  flex-direction: column;
  align-items: flex-start;
  max-width: 340px;
  ${downThanBreakpoint(2)} {
    max-width: 100%;
    align-items: center;
  }
`;

export const Mockup = styled.video`
  display: block;
  width: 100%;
  max-width: 890px;
  margin: 30px auto 0;
`;
