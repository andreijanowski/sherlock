import styled from "styled-components";
import { Flex } from "@rebass/grid";

import { LandingContainer } from "sections/landings/common/sharedStyled";
import { H1, H2, Subtitle } from "components/styleguide/Typography";
import { downThanBreakpoint } from "utils/theme";

export const Container = styled(LandingContainer)``;

export const H2Styled = styled(H2)`
  text-align: center;
`;

export const Benefit = styled(Flex)`
  flex-direction: column;
  align-items: center;
`;

export const Percents = styled(H1)`
  flex: none;
  font-size: 64px;
  line-height: 77px;
  ${downThanBreakpoint(2)} {
    font-size: 64px;
    line-height: 77px;
  }
`;

export const Hint = styled(Subtitle)`
  flex: auto;
`;

export const Description = styled(Subtitle)`
  flex: none;
  text-align: center;
`;
