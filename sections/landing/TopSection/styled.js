import styled from "styled-components";
import { H1, Paragraph } from "components";
import { alignCenterMobile } from "../sharedStyled";

export const H1Styled = styled(H1)`
  ${alignCenterMobile}
  color: white;
  @media (min-width: ${p => p.theme.breakpoints[2]}) {
    font-size: ${p => p.theme.fontSizes.f52};
  }
`;

export const ParagraphStyled = styled(Paragraph)`
  ${alignCenterMobile}
  color: #e0e0e0;
  font-weight: 500;
  font-size: ${p => p.theme.fontSizes.f15};
  line-height: 20px;
  letter-spacing: 0.3px;
  @media (min-width: ${p => p.theme.breakpoints[2]}) {
    font-size: ${p => p.theme.fontSizes.f16};
  }
`;

export const Image = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  background: url("/static/img/topsection/dashboard.png") no-repeat top;
  @media (min-width: ${p => p.theme.breakpoints[0]}) {
    background: url("/static/img/topsection/dashboard.png") no-repeat;
  }
`;
