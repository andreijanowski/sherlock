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
  width: 100%;
  height: 100%;
  min-height: 400px;
  max-height: 500px;
  background-image: url("/static/img/topsection/dashboard.png");
  background-repeat: no-repeat;
  background-position: top left;
  background-size: contain;
  @media (min-width: ${p => p.theme.breakpoints[0]}) {
    width: 100vw;
    min-height: 600px;
    max-height: 800px;
  }
`;
