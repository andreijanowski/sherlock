import styled, { createGlobalStyle } from "styled-components";
import { Box } from "@rebass/grid";

export const SwitchWrapper = styled(Box)`
  display: flex;
  justify-content: center;
  margin-bottom: 100px;
  max-height: 40px;
`;

export const Officon = styled.div`
  color: white;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 16px;
  margin-top: 10px;
`;

export const SwitchStyles = createGlobalStyle`
  .react-switch {
    border: 1px solid white;

    .react-switch-bg {
      position: initial !important;
      margin: 0 24px !important;
      height: 28px !important;

      & >div:nth-child(2) {
        right: 10px !important;
      }
    }
  
    .react-switch-handle {
      left: -1px;
      width: 88px !important;
      border-radius: 24px !important;
      max-height: 38px;
      display: flex !important;
      justify-content: center;
      align-items: center;

      &::before {
        color: rgb(${p => p.theme.colors.b2bSecondary});
      }
    }
  }
`;

export const SwtichOffLabel = createGlobalStyle`
  .react-switch {  
    .react-switch-handle {
      &::before {
        content: 'Blog';
      }
    }
  }
`;

export const SwtichOnLabel = createGlobalStyle`
  .react-switch {  
    .react-switch-handle {
      &::before {
        content: 'News';
      }
    }
  }
`;
