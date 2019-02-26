import styled, { css } from "styled-components";
import { Flex, Box } from "@rebass/grid";

export const IconMain = css`
  stroke-opacity: 0.4;
  fill-opacity: 0.4;
  stroke: rgb(${p => p.theme.colors.white});
  fill: rgb(${p => p.theme.colors.white});
`;

export const IconMainActive = css`
  stroke-opacity: 1;
  fill-opacity: 1;
  opacity: 1;
`;

export const IconSub = css`
  stroke: rgb(${p => p.theme.colors.dark});
  fill: rgb(${p => p.theme.colors.dark});
`;

export const IconWrapper = styled.div`
  path,
  circle,
  rect,
  g {
    ${p => p.main && IconMain};
    ${p => p.mainActive && IconMainActive};
    ${p => p.dark && IconSub};
  }
`;

export const ToggledMobileMenu = styled(Flex).attrs({
  flexDirection: "column"
})`
  position: absolute;
  top: 60px;
  left: -150%;
  ${p => p.isMobileNavOpen && "left: 0"};
  transition: left 0.5s;
  width: 100vw;
  height: calc(100vh - 60px);
  background: rgb(${p => p.theme.colors.iceBlue});
`;

export const MenuScrollContainer = styled(Box).attrs({
  p: 4
})`
  overflow-y: scroll;
`;

export const IconLabel = styled.span`
  padding-left: 16px;
  font-weight: 500;
`;

export const SubMenuWrapper = styled(Box).attrs({
  p: 4
})`
  height: calc(100vh - 60px);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  left: -120%;
  ${p => p.isSubmenuOpen && "left: 0"};
  transition: left 0.5s;
  background: rgb(${p => p.theme.colors.iceBlue});
`;
