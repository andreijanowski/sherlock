import styled from "styled-components";
import { Box } from "@rebass/grid";
import { Button } from "components";

export const Content = styled(Box).attrs({
  mb: [1, 5],
  alignSelf: "center"
})`
  max-width: 896px;
`;

export const LogoWrapper = styled(Box).attrs({
  mb: 5,
  ml: [0, 0, 0, "-76px"]
})``;

export const ButtonWithIcon = styled(Button).attrs({
  styleName: "transparent"
})`
  font-size: ${p => p.theme.fontSizes.f14};
  svg {
    margin-right: 8px;
    max-height: 10.5px;
  }
`;
