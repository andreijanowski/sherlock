import styled from "styled-components";
import { Flex, Box } from "@rebass/grid";

export const Wrapper = styled(Flex).attrs({
  p: 3,
  justifyContent: "space-between"
})`
  border-radius: ${p => p.theme.radius.default};
  border-top: 6px solid rgb(${p => p.theme.colors.carrotOrange});
  background-color: rgb(${p => p.theme.colors.white});
  box-shadow: 0 2px 6px 0 rgba(${p => p.theme.colors.blue}, 0.08);
  font-size: ${p => p.theme.fontSizes.f16};
  font-weight: ${p => p.theme.fontWeights.medium};
  line-height: 24px;
`;

export const InfoWrapper = styled(Flex).attrs({
  alignItems: "center"
})`
  color: rgb(${p => p.theme.colors.dark});
`;

export const Info = styled(Box).attrs({
  px: 2,
  mr: 2
})`
  border-radius: ${p => p.theme.radius.default};
  border: 2px solid rgb(${p => p.theme.colors.carrotOrange});
  color: rgb(${p => p.theme.colors.carrotOrange});
  font-weight: ${p => p.theme.fontWeights.bold};
  font-size: ${p => p.theme.fontSizes.f14};
  line-height: 16px;
`;

export const Complete = styled(Box)`
  color: rgb(${p => p.theme.colors.bombay});
`;
