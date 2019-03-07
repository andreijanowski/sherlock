import styled, { css } from "styled-components";
import { H2, Paragraph } from "components";

export const alignCenterMobile = css`
  text-align: center;
  @media (min-width: ${p => p.theme.breakpoints[0]}) {
    text-align: start;
  }
`;

export const H2Styled = styled(H2)`
  ${alignCenterMobile}
`;

export const ParagraphStyled = styled(Paragraph)`
  ${alignCenterMobile}
`;
