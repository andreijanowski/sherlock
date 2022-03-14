import styled, { createGlobalStyle } from "styled-components";
import { Box } from "@rebass/grid";

export const SwitchWrapper = styled(Box)`
  display: flex;
  justify-content: center;
  margin-bottom: 100px;
  max-height: 40px;
`;

export const Handler = styled.div`
  height: 100%;
  width: 100%;
  color: red;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 16px;
  z-index: 2;
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
      margin: 0 24px !important;
      height: 28px !important;
    }
  
    .react-switch-handle {
      width: 86px !important;
      border-radius: 24px !important;
      max-height: 38px;
    }
  }
`;
