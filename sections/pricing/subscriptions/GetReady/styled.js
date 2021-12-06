import styled from "styled-components";
import { Flex } from "@rebass/grid";

import { WRAPPER_WIDTH } from "utils/theme";
import { H3 } from "components/styleguide/Typography";

export const Container = styled(Flex)`
  max-width: ${WRAPPER_WIDTH}px;
  margin: auto;
`;

export const H3Styled = styled(H3).attrs({ big: true })`
  max-width: 470px;
`;

export const ImageContainer = styled.div`
  position: relative;
  text-align: center;
`;

export const Image = styled.img`
  @media (max-width: ${p => p.theme.breakpoints[1]}) {
    max-width: 100%;
  }
`;
