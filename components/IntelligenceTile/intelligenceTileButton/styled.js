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

export const ButtonsContainer = styled(Flex)`
  ${p =>
    p.isIntegration &&
    `
    flex-direction: column;
  `}
  @media (max-width: 1200px) {
    flex-direction: column;
  }
`;

export const ButtonWrapper = styled(Box)`
  min-width: 122px;
  flex: 1;
  &:not(:last-child) {
    margin-right: 16px;
  }
  ${p =>
    p.isIntegration &&
    `
    @media (max-width: 1600px) {
      &:not(:last-child) {
        margin-right: 0;
        margin-bottom: 16px;
      } 
    }
    
  `}
  @media (max-width: 1200px) {
    &:not(:last-child) {
      margin-right: 0;
      margin-bottom: 16px;
    }
  }
`;

export const BlueButton = styled(Button).attrs({
  styleName: "navyBlue"
})`
  ${CommonButtonStyles}
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid rgb(${p => p.theme.colors.navyBlue});
`;
