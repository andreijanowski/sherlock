import styled from "styled-components";

import { LandingContainer } from "sections/landings/common/sharedStyled";
import { downThanBreakpoint, themeGet } from "utils/theme";
import { AdaptiveBox } from "components/styleguide/common";

export const Container = styled(LandingContainer)``;

export const TabletBlueText = styled.span`
  ${downThanBreakpoint(2)} {
    color: rgb(${themeGet("colors.blue")});
  }
`;

export const TabletImageBox = styled(AdaptiveBox)`
  max-width: 100%;
  margin-bottom: 24px;
`;
