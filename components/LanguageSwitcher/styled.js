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
  border: ${({ withBorder, theme }) =>
    withBorder
      ? `${theme.borderWeights.normal} solid
    rgba(${theme.colors.dark}, 0.16)`
      : "none"};
  color: rgba(${({ theme }) => theme.colors.dark}, 0.64);
  border-radius: ${({ theme }) => theme.radius.default};
  font-size: ${({ theme }) => theme.fontSizes.f14};
  line-height: ${({ theme }) => theme.fontSizes.f24};
  width: 108px;
  height: 40px;
  font-weight: 600;
  outline: none;
  text-transform: capitalize;
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
  background-color: rgb(${({ theme }) => theme.colors.background});
  border: ${({ theme }) => theme.borderWeights.normal} solid
    rgba(${({ theme }) => theme.colors.dark}, 0.16);
  color: rgba(${({ theme }) => theme.colors.dark}, 0.64);
  border-radius: ${({ theme }) => theme.radius.default};
  width: 108px;
  left: -${({ theme }) => theme.borderWeights.normal};
  ${({ listPosition }) => listPosition === "top" && LanguageListTop}
  ${({ listPosition }) => listPosition === "bottom" && LanguageListBottom}
`;

export const LanguageListItem = styled(Box).attrs({
  px: "16px",
  py: "8px"
})`
  font-size: ${({ theme }) => theme.fontSizes.f14};
  line-height: ${({ theme }) => theme.fontSizes.f24};
  width: 100%;
  border-bottom: ${({ theme }) => theme.borderWeights.normal} solid
    rgba(${({ theme }) => theme.colors.dark}, 0.16);
  cursor: pointer;
  &:last-child {
    border-bottom: none;
  }
  &:hover {
    background-color: rgba(${({ theme }) => theme.colors.dark}, 0.16);
  }

  ${FlagIcon} {
    vertical-align: middle;
    margin-right: 8px;
  }
`;

export const SelectedLanguageWrapper = styled(Flex).attrs({
  alignItems: "center"
})`
  ${FlagIcon} {
    margin-right: 8px;
  }
`;
