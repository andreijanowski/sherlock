import styled from "styled-components";
import { Flex, Box } from "@rebass/grid";

export const ColumnWrapper = styled(Flex).attrs(() => ({
  flexDirection: "column",
  p: 2
}))`
  width: ${p => p.width || "280px"};
`;

export const ColumnHeader = styled(Flex).attrs(() => ({
  py: 3,
  px: 2,
  justifyContent: "space-between",
  alignItems: "center"
}))`
  /* stylelint-disable-line no-empty-block */
`;

export const ColumnTitle = styled(Box)`
  color: rgb(${p => p.theme.colors.dark});
  font-size: ${p => p.theme.fontSizes.f12};
`;

export const ItemsNumber = styled(Box).attrs(() => ({ width: 32 }))`
  height: 32px;
  color: rgb(
    ${p => (p.isColumnGrayedOut ? p.theme.colors.ruby : p.theme.colors.blue)}
  );
  font-weight: ${p => p.theme.fontWeights.bold};
  font-size: ${p => p.theme.fontSizes.f14};
  line-height: 32px;
  text-align: center;
  background-color: rgba(
    ${p => (p.isColumnGrayedOut ? p.theme.colors.ruby : p.theme.colors.blue)},
    0.1
  );
  border-radius: 16px;
`;

export const ItemsWrapper = styled(Flex).attrs(() => ({
  flexDirection: "column",
  p: 2
}))`
  ${p =>
    p.isColumnGrayedOut
      ? `background: repeating-linear-gradient(45deg,
          rgb(${p.theme.colors.white}),
          rgb(${p.theme.colors.white}) 10px,
          rgb(${p.theme.colors.linkWater}) 10px,
          rgb(${p.theme.colors.linkWater}) 11px);
        border: 1px solid rgb(${p.theme.colors.linkWater})`
      : `background-color: rgb(${p.theme.colors.linkWater})`};
  height: 100%;
  border-radius: ${p => p.theme.radius.default};
  ${p =>
    p.isDropDisabled && `background-color: rgba(${p.theme.colors.ruby}, 0.1);`}
`;
