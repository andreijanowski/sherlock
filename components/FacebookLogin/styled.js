import styled from "styled-components";
import { Button } from "components";

export const FacebookStyledButton = styled(Button)`
  background-color: rgb(${p => p.theme.colors.facebookBlue});
  padding: 12px;
  min-height: 49px;
  height: 100%;
  color: rgb(${p => p.theme.colors.white});
  position: relative;
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
    left: 40px;
    top: 10px;
  }
`;

export const FacebookButtonText = styled.span`
  flex: 1;
`;
