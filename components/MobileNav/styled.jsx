import styled, { css } from "styled-components";
import { Flex, Box } from "@rebass/grid";

export const IconMain = css`
  font-size: 60px;
  stroke-opacity: 0.4;
  fill-opacity: 0.4;
  svg .primary {
    color: white;
  }

  svg .secondary {
    color: white;
  }
`;

export const IconMainActive = css`
  stroke-opacity: 1;
  fill-opacity: 1;
  opacity: 1;
`;

export const IconSub = css`
  font-size: 45px;
  svg .primary {
    color: rgb(${p => p.theme.colors.bombay});
  }
  svg .secondary {
    color: rgb(${p => p.theme.colors.bombayDark});
  }
  fill: rgb(${p => p.theme.colors.dark});
  stroke: rgb(${p => p.theme.colors.dark});
`;

export const NoFill = css`
  fill: none;
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 45px;
  line-height: 0;

  ${p => p.main && IconMain};
  ${p => p.mainActive && IconMainActive};
  ${p => p.dark && IconSub}
  ${p => p.noFill && NoFill};
`;

export const ToggledMobileMenu = styled(Flex).attrs(() => ({
  flexDirection: "column"
}))`
  position: absolute;
  top: 60px;
  left: -150%;
  ${p => p.isMobileNavOpen && "left: 0"};
  width: 100vw;
  height: calc(100vh - 60px);
  background: rgb(${p => p.theme.colors.iceBlue});
  transition: left 0.5s;
`;

export const MenuScrollContainer = styled(Box).attrs(() => ({
  p: 4
}))`
  overflow-y: scroll;
`;

export const IconLabel = styled.span`
  display: flex;
  align-items: center;
  padding: 15px 0 15px 16px;
  font-weight: 500;
`;

export const SubMenuWrapper = styled(Box).attrs(() => ({
  p: 4
}))`
  position: absolute;
  top: 0;
  left: -120%;
  width: 100%;
  height: calc(100vh - 60px);
  ${p => p.isSubmenuOpen && "left: 0"};
  background: rgb(${p => p.theme.colors.iceBlue});
  transition: left 0.5s;
`;
