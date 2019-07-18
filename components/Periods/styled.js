import styled from "styled-components";
import { Flex } from "@rebass/grid";

export const Form = styled(Flex).attrs(() => ({
  as: "form",
  flexDirection: "column",
  p: 4,
  width: 1
}))`
  background-color: rgb(${p => p.theme.colors.white});
  border-radius: ${p => p.theme.radius.default};
  box-shadow: 0 2px 6px 0 rgba(${p => p.theme.colors.blue}, 0.08);
`;

export const Actions = styled(Flex).attrs(() => ({
  width: 96,
  mb: 3
}))`
  /* stylelint-disable-line no-empty-block */
`;

export const Action = styled.span`
  color: rgb(${p => p.theme.colors.blue});
  font-size: ${p => p.theme.fontSizes.f14};
  cursor: pointer;
`;

export const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: rgb(${p => p.theme.colors.snuff});
`;
