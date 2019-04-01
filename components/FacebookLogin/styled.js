import styled from "styled-components";
import { Button } from "components";

export const FacebookStyledButton = styled(Button)`
  background-color: rgb(${p => p.theme.colors.facebookBlue});
  padding: 12px;
  min-height: 49px;
  color: rgb(${p => p.theme.colors.white});
  position: relative;
  border: none;
`;

export const FacebookIconWrapper = styled.div`
  svg {
    position: absolute;
    left: 10px;
    top: 10px;
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
