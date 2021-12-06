import styled from "styled-components";
import { Flex } from "@rebass/grid";

import { downThanBreakpoint } from "utils/theme";

export const Container = styled(Flex).attrs(p =>
  p.isVertical
    ? {
        flexDirection: "column"
      }
    : {}
)`
  align-items: center;
  color: rgb(${p => p.theme.colors.landingDarkBlue});
  cursor: pointer;
  ${downThanBreakpoint(1)} {
    display: none;
  }
`;

export const Label = styled.div`
  font-size: ${p => p.theme.fontSizes.f24};
  font-weight: ${p => p.theme.fontWeights.medium};
  line-height: 25px;
`;
