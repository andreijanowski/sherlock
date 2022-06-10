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
