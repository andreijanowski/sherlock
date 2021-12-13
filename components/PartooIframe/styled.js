import styled from "styled-components";
import { Flex } from "@rebass/grid";

import { downThanBreakpoint } from "utils/theme";

// important is only way to set height for partoo container for now
export const IFrameContainer = styled.div`
  height: calc(100vh - 112px) !important;
  ${downThanBreakpoint(1)} {
    margin: -16px;
    height: calc(100vh - 120px) !important;
  }
`;

export const NotConnectedContainer = styled(Flex)`
  flex: auto;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-height: calc(100vh - 200px);
`;
