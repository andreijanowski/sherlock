import styled from "styled-components";
import { Box } from "@rebass/grid";
import { Button } from "components";

export const Content = styled(Box).attrs({
  mb: 5,
  alignSelf: "center"
})`
  max-width: 896px;
`;

export const LogoWrapper = styled(Box).attrs({
  mb: 5
})`
  margin-left: -76px;
`;

export const ButtonWithIcon = styled(Button).attrs({
  styleName: "transparent"
})`
  font-size: ${({ theme }) => theme.fontSizes.f14};
  svg {
    margin-right: 8px;
  }
`;
