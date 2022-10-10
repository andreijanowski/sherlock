import styled from "styled-components";
import { Flex, Box } from "@rebass/grid";

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
  padding: 2px;
  width: 100%;
  display: flex;
  &:not(:last-child) {
    margin-right: 8px;
  }

  @media (max-width: 1200px) {
    &:not(:last-child) {
      margin-right: 0;
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
