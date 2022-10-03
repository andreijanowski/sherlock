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

export const ButtonsContainer = styled(Flex)`
  ${p =>
    p.isIntegration &&
    `
    @media (max-width: 1200px) {
    flex-direction: column;
    }
  `}
  @media (max-width: 1200px) {
    flex-direction: column;
  }
`;

export const ButtonWrapper = styled(Box)`
  padding: 2px;
  width: 100%;
  display: flex;
  margin-bottom: 4px;
  &:not(:last-child) {
    margin-right: 8px;
  }

  @media (max-width: 1200px) {
    &:not(:last-child) {
      margin-right: 0;
      margin-bottom: 8px;
    }
  }

  > button {
    &:not(:last-child) {
      margin-right: 8px;
    }

    &:hover {
      border: 1px solid rgba(${p => p.theme.colors.blue}) !important;
    }
  }
`;

export const BlueButton = styled(Button).attrs({
  styleName: "darkBlue"
})`
  ${CommonButtonStyles}
  max-height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
