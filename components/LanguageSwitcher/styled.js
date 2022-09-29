import styled, { css } from "styled-components";
import { Flex, Box } from "@rebass/grid";

import { downThanBreakpoint } from "utils/theme";

const MOBILE_BREAKPOINT = 0;

/* Icon source http://flag-icon-css.lip.is/ */
export const FlagIcon = styled.img.attrs(({ code }) => ({
  src: `/static/flags/${code}.svg`
}))`
  box-shadow: 2px 0 6px 0 rgba(${p => p.theme.colors.dark}, 0.48);
  width: 17px;
  height: 12px;
`;

export const LanguageSwitcherWrapper = styled(Flex).attrs(() => ({
  alignItems: "center",
  justifyContent: "space-between"
}))`
  position: relative;
  z-index: 10;
  width: auto;
  border: ${({ withBorder, theme }) =>
    withBorder
      ? `${theme.borderWeights.normal} solid
    rgba(${theme.colors.dark}, 0.16)`
      : "none"};
  border-radius: ${p => p.theme.radius.default};
  outline: none;
  cursor: pointer;
`;

const LanguageListTop = css`
  bottom: 45px;
`;

const LanguageListBottom = css`
  top: 45px;
`;

export const LanguageList = styled(Flex).attrs(() => ({
  flexDirection: "column"
}))`
  position: absolute;
  right: -${p => p.theme.borderWeights.normal};
  width: auto;
  color: rgba(${p => p.theme.colors.dark}, 0.64);
  background-color: rgb(${p => p.theme.colors.background});
  border: ${p => p.theme.borderWeights.normal} solid
    rgba(${p => p.theme.colors.dark}, 0.16);
  border-radius: ${p => p.theme.radius.default};
  ${({ listPosition }) => listPosition === "top" && LanguageListTop}
  ${({ listPosition }) => listPosition === "bottom" && LanguageListBottom}
  
  ${downThanBreakpoint(MOBILE_BREAKPOINT)} {
    width: 100%;
    right: 0;
  }
`;

export const LanguageListItem = styled(Box).attrs(() => ({
  px: "16px",
  py: "8px"
}))`
  width: 150px;
  font-size: ${p => p.theme.fontSizes.f14};
  line-height: ${p => p.theme.fontSizes.f24};
  border-bottom: ${p => p.theme.borderWeights.normal} solid
    rgba(${p => p.theme.colors.dark}, 0.16);
  cursor: pointer;
  &:last-child {
    border-bottom: none;
  }
  &:hover {
    background-color: rgba(${p => p.theme.colors.dark}, 0.16);
  }

  ${FlagIcon} {
    margin-right: 8px;
    vertical-align: middle;
  }

  ${downThanBreakpoint(MOBILE_BREAKPOINT)} {
    width: 100%;
  }
`;

export const SelectedLanguageWrapper = styled(Flex).attrs(() => ({
  alignItems: "center"
}))`
  width: 100%;
  justify-content: space-between;
  font-size: 14px;

  svg {
    &:last-child {
      margin-left: 5px;
    }
  }
`;

export const HiddenSEOLinks = styled(Box).attrs(() => ({
  px: "1px",
  py: "1px"
}))`
  width: 1px;
  visibility: hidden;
`;
