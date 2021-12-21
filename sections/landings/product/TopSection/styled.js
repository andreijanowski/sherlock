import styled from "styled-components";

import { LandingContainer } from "sections/landings/common/sharedStyled";
import { H1 } from "components/styleguide/Typography";
import { downThanBreakpoint, themeGet } from "utils/theme";
import { AdaptiveBox } from "components/styleguide/common";

export const Container = styled(LandingContainer)``;

export const H1Styled = styled(H1)`
  font-size: 64px;
  line-height: 77px;
`;

export const TabletBlueText = styled.span`
  ${downThanBreakpoint(2)} {
    color: rgb(${themeGet("colors.blue")});
  }
`;

export const TabletImageBox = styled(AdaptiveBox)`
  margin-bottom: 24px;
`;
