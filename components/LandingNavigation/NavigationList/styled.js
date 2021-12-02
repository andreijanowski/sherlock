import styled from "styled-components";
import { Flex } from "@rebass/grid";

import { downThanBreakpoint, themeGet } from "utils/theme";
import { AdaptiveBox } from "components/styleguide/common";

export const Container = styled(Flex)`
  width: 100%;
  position: relative;
  justify-content: center;
  ${downThanBreakpoint(2)} {
    flex: auto;
    display: ${p => (p.isMenuOpened ? "flex" : "none")};
    flex-direction: column;
    justify-content: flex-start;
    overflow-y: auto;
    background: rgb(${themeGet("colors.white")});
  }
`;

export const NavigationListItem = styled(AdaptiveBox)`
  position: relative;
  font-weight: ${p => p.theme.fontWeights.semiBold};
  font-size: ${p => p.theme.fontSizes.f18};
  line-height: 25px;
  color: rgb(${p => p.theme.colors.white});
  ${p =>
    p.isActive &&
    `
    &:after {
      content: "";
      display: block;
      position: absolute;
      left: 0;
      right: 0;
      bottom: -10px;
      border: 3px solid rgb(${p.theme.colors.white});
      background: rgb(${p.theme.colors.white});
      border-radius: 10px;
    }
  `}

  ${downThanBreakpoint(2)} {
    width: 100%;
    justify-content: space-between;
    padding: 16px;
    color: rgb(${themeGet("colors.blackDark")});
    border-bottom: 1px solid rgb(${themeGet("colors.border")});
    ${p =>
      p.isActive &&
      `
      &:after {
        content: none;
      }
  `}
  }
`;

export const LanguageSwitcherContainer = styled(AdaptiveBox)`
  position: absolute;
  top: 50%;
  right: 32px;
  transform: translateY(-50%);
  z-index: 10;
`;

export const MobileCTAButtons = styled(AdaptiveBox)`
  background: rgb(${themeGet("colors.landingDarkBlue")});
`;

export const MobileLanguageSwitcherContainer = styled(NavigationListItem)``;
