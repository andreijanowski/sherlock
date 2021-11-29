import styled from "styled-components";
import { Flex, Box } from "@rebass/grid";

import { WRAPPER_WIDTH } from "utils/theme";
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
`;

export const Mockup = styled.img`
  display: block;
  margin: auto;
`;
