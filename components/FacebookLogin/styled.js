import styled from "styled-components";
import { Button } from "components";

export const FacebookStyledButton = styled(Button)`
  position: relative;
  height: 100%;
  min-height: 49px;
  padding: 12px;
  color: rgb(${p => p.theme.colors.white});
  background-color: rgb(${p => p.theme.colors.facebookBlue});
  border: none;
`;

export const FacebookIconWrapper = styled.div`
  display: flex;
  svg {
    height: 30px;
  }
`;

export const LoadingIconWrapper = styled.div`
  svg {
    position: absolute;
    top: 10px;
    left: 40px;
  }
`;

export const FacebookButtonText = styled.span`
  flex: 1;
`;
