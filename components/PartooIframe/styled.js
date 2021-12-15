import styled from "styled-components";
import { Flex } from "@rebass/grid";

import { upThanBreakpoint } from "utils/theme";
import Button from "components/styleguide/Button";

const CONTROL_BREAKPOINT = 0;

// important is only way to set height for partoo container for now
export const ConnectedContainer = styled(Flex)`
  flex-direction: column;
  align-items: center;
  margin: 0 -16px -16px;
  height: calc(100vh - 136px) !important;
  ${upThanBreakpoint(CONTROL_BREAKPOINT)} {
    width: 100%;
    margin: 0 auto;
    align-items: flex-start;
    height: calc(100vh - 120px) !important;
  }
`;

export const IFrameContainer = styled.div`
  width: 100%;
  flex: auto;
`;

export const TopPane = styled(Flex)`
  flex: none;
  padding: 0 16px 16px;
  align-items: center;
  ${upThanBreakpoint(CONTROL_BREAKPOINT)} {
    padding: 16px;
    align-items: flex-start;
  }
`;

export const ButtonStyled = styled(Button)`
  align-items: center;
`;

export const NotConnectedContainer = styled(Flex)`
  flex: auto;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-height: calc(100vh - 200px);
`;
