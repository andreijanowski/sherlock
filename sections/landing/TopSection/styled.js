import styled from "styled-components";

import { Paragraph } from "components";
import { H1 } from "components/styleguide/Typography";
import { alignCenterTablet } from "sections/common/sharedStyled";
import { AdaptiveBox } from "components/styleguide/common";
import { upThanBreakpoint } from "utils/theme";

export const H1Styled = styled(H1)`
  font-size: 60px;
  line-height: 70px;
`;

export const ParagraphStyled = styled(Paragraph)`
  ${alignCenterTablet}
  color: #e0e0e0;
  font-weight: 500;
  font-size: ${p => p.theme.fontSizes.f15};
  line-height: 20px;
  letter-spacing: 0.3px;
  @media (min-width: ${p => p.theme.breakpoints[2]}) {
    font-size: ${p => p.theme.fontSizes.f16};
  }
`;

export const ImagesSliderColumn = styled(AdaptiveBox)`
  position: relative;
`;

export const ImagesSliderContainer = styled.div`
  position: relative;
  left: initial;
  ${upThanBreakpoint(2)} {
    position: absolute;
    left: 80px;
  }
`;
