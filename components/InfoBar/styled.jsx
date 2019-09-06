import styled from "styled-components";
import { Flex, Box } from "@rebass/grid";

export const Wrapper = styled(Flex).attrs(() => ({
  p: 3,
  justifyContent: "space-between"
}))`
  font-weight: ${p => p.theme.fontWeights.medium};
  font-size: ${p => p.theme.fontSizes.f16};
  line-height: 24px;
  background-color: rgb(${p => p.theme.colors.white});
  border-top: 6px solid rgb(${p => p.theme.colors.carrotOrange});
  border-radius: ${p => p.theme.radius.default};
  box-shadow: 0 2px 6px 0 rgba(${p => p.theme.colors.blue}, 0.08);
`;

export const InfoWrapper = styled(Flex).attrs(() => ({
  alignItems: "center"
}))`
  color: rgb(${p => p.theme.colors.dark});
`;

export const Info = styled(Box).attrs(() => ({
  px: 2,
  mr: 2
}))`
  color: rgb(${p => p.theme.colors.carrotOrange});
  font-weight: ${p => p.theme.fontWeights.bold};
  font-size: ${p => p.theme.fontSizes.f14};
  line-height: 16px;
  border: 2px solid rgb(${p => p.theme.colors.carrotOrange});
  border-radius: ${p => p.theme.radius.default};
`;

export const Complete = styled(Box)`
  color: rgb(${p => p.theme.colors.bombay});
`;
