import styled from "styled-components";
import { H1 } from "components";
import { alignCenterMobile } from "../sharedStyled";

export const H1Styled = styled(H1)`
  ${alignCenterMobile}
  @media (min-width: ${p => p.theme.breakpoints[2]}) {
    font-size: ${p => p.theme.fontSizes.f52};
  }
`;
