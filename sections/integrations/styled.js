import { Flex } from "@rebass/grid";
import styled from "styled-components";

import { StyledButton } from "components";
import { downThanBreakpoint } from "utils/theme";

export const Wrapper = styled(Flex).attrs(() => ({
  px: [3, 4],
  pt: [3, 4],
  pb: [3, 4],
  flexWrap: "wrap"
}))`
  background-color: rgb(${p => p.theme.colors.white});
  border-radius: ${p => p.theme.radius.biggest};
  box-shadow: ${p =>
    p.isLandingPage ? "0" : `0 2px 6px 0 rgba(${p.theme.colors.blue}, 0.08);`};
`;

export const NoPartners = styled(Flex)`
  height: 200px;
`;

export const GridWrapper = styled(Wrapper)`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 25px;
  @media (max-width: 1600px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 1280px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

export const BackToListButton = styled(Flex)`
  color: rgb(${p => p.theme.colors.navyBlue});
  cursor: pointer;
`;

export const BlueButton = styled(StyledButton)`
  width: auto;
`;

export const IframeWrapper = styled.div`
  position: relative;
  width: 100%;
  border-radius: ${p => p.theme.radius.default};
  box-shadow: 0 2px 6px 0 rgba(${p => p.theme.colors.blue}, 0.08);
`;

export const IFrame = styled.iframe`
  width: 100%;
  height: calc(100vh - 196px);
  border: none;
  ${downThanBreakpoint(1)} {
    height: 500px;
  }
`;
