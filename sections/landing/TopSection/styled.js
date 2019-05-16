import styled from "styled-components";
import { Box } from "@rebass/grid";
import { Button, H1 } from "components";
import { alignCenterMobile } from "../sharedStyled";

export const Content = styled(Box).attrs({
  mb: [1, 5],
  alignSelf: "center",
  mt: [28, 0]
})`
  position: static;
  max-width: 896px;
  @media (min-width: ${p => p.theme.breakpoints[0]}) {
    position: relative;
  }
`;

export const LogoWrapper = styled(Box).attrs({
  mb: 5,
  ml: [0, 0, 0, "-76px"]
})`
  display: none;
  @media (min-width: ${p => p.theme.breakpoints[0]}) {
    display: block;
  }
`;

export const LogoMobileWrapper = styled.div`
  position: absolute;
  top: 28px;
  @media (min-width: ${p => p.theme.breakpoints[0]}) {
    display: none;
  }
`;

export const H1Styled = styled(H1)`
  ${alignCenterMobile}
`;

export const ButtonWithIcon = styled(Button).attrs({
  styleName: "outlineBlue",
  fullHeight: true
})`
  font-size: ${p => p.theme.fontSizes.f14};
  background: none;
  svg {
    max-height: 10.5px;
    margin-right: 8px;
  }
`;
