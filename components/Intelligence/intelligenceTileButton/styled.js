import styled, { css } from "styled-components";
import { Flex, Box } from "@rebass/grid";
import { Button } from "components";

const CommonButtonStyles = css`
  width: 100%;
  white-space: nowrap;
  ${p =>
    p.big
      ? `
      padding: 8px;
    `
      : `
    padding: 6px;
    font-weight: ${p.theme.fontWeights.medium};
    font-size: ${p.theme.fontSizes.f12};
    line-height: ${p.theme.fontSizes.f16};
  `};
`;

export const Container = styled(Flex)`
  ${p => (p.hasUrl ? `flex-direction: row;` : `flex-direction: column;`)};
`;

export const ButtonWrapper = styled(Box)`
  min-width: 122px;
  flex: 1;
  padding: 4px;
`;

export const BlueButton = styled(Button).attrs({
  styleName: "darkBlue"
})`
  ${CommonButtonStyles}
  display: flex;
  align-items: center;
  justify-content: center;
`;
