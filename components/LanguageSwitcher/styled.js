import styled, { css } from "styled-components";
import { Flex, Box } from "@rebass/grid";

/* Icon source http://flag-icon-css.lip.is/ */
export const FlagIcon = styled.img.attrs(({ code }) => ({
  src: `/static/flags/${code}.svg`
}))`
  width: 22px;
  height: 14px;
`;

export const LanguageSwitcherWrapper = styled(Flex).attrs({
  px: "16px",
  alignItems: "center",
  justifyContent: "space-between"
})`
  position: relative;
  width: 108px;
  height: 40px;
  color: rgba(${p => p.theme.colors.dark}, 0.64);
  font-weight: ${p => p.theme.fontWeights.semiBold};
  font-size: ${p => p.theme.fontSizes.f14};
  line-height: ${p => p.theme.fontSizes.f24};
  text-transform: capitalize;
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

export const LanguageList = styled(Flex).attrs({
  flexDirection: "column"
})`
  position: absolute;
  left: -${p => p.theme.borderWeights.normal};
  width: 108px;
  color: rgba(${p => p.theme.colors.dark}, 0.64);
  background-color: rgb(${p => p.theme.colors.background});
  border: ${p => p.theme.borderWeights.normal} solid
    rgba(${p => p.theme.colors.dark}, 0.16);
  border-radius: ${p => p.theme.radius.default};
  ${({ listPosition }) => listPosition === "top" && LanguageListTop}
  ${({ listPosition }) => listPosition === "bottom" && LanguageListBottom}
`;

export const LanguageListItem = styled(Box).attrs({
  px: "16px",
  py: "8px"
})`
  width: 100%;
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
`;

export const SelectedLanguageWrapper = styled(Flex).attrs({
  alignItems: "center"
})`
  ${FlagIcon} {
    margin-right: 8px;
  }
`;
