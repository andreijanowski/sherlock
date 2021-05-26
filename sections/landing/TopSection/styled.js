import styled from "styled-components";
import { H1, Paragraph } from "components";
import { alignCenterMobile } from "../sharedStyled";

export const H1Styled = styled(H1)`
  ${alignCenterMobile}
  color: white;
  letter-spacing: 1.2px;
  @media (min-width: ${p => p.theme.breakpoints[2]}) {
    font-size: ${p => p.theme.fontSizes.f60};
    line-height: 70px;
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

export const Image = styled.img`
  width: 100%;
  @media (min-width: ${p => p.theme.breakpoints[2]}) {
    width: auto;
  }
`;
