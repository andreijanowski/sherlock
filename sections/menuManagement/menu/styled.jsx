import styled from "styled-components";
import { Flex, Box } from "@rebass/grid";

import { Button } from "components";
import { downThanBreakpoint } from "utils/theme";

const CONTROL_BREAKPOINT = 3;

export const Wrapper = styled(Flex).attrs(() => ({
  flexDirection: "column",
  p: 4
}))`
  flex: auto;
  overflow: auto;
  background-color: rgb(${p => p.theme.colors.white});
`;

export const InnerWrapper = styled(Flex).attrs({
  mx: [0, null, null, null, -1]
})`
  flex: auto;
  overflow: auto;
  position: relative;
  ${downThanBreakpoint(CONTROL_BREAKPOINT)} {
    flex: none;
    overflow: initial;
  }
`;

export const FloatingColumn = styled.div`
  align-self: flex-start;
  position: sticky;
  top: 0;
  ${downThanBreakpoint(CONTROL_BREAKPOINT)} {
    position: static;
  }
`;

export const Dish = styled(Flex).attrs(() => ({
  p: 2,
  pr: 3,
  mb: 2,
  alignItems: "center",
  justifyContent: "space-between"
}))`
  flex-wrap: wrap;
  background-color: rgb(${p => p.theme.colors.white});
  border: 1px solid rgb(${p => p.theme.colors.snuff});
  border-radius: ${p => p.theme.radius.default};
`;

export const Image = styled.div`
  flex: none;
  width: 60px;
  height: 60px;
  margin-right: 16px;
  background-color: rgb(${p => p.theme.colors.snuff});
  background-image: url(${p => p.src});
  background-position: center;
  background-size: cover;
  border-radius: ${p => p.theme.radius.default};
`;

export const Name = styled.div`
  width: 100%;
  overflow: hidden;
  color: rgb(${p => p.theme.colors.dark});
  font-weight: ${p => p.theme.fontWeights.medium};
  font-size: ${p => p.theme.fontSizes.f16};
  line-height: 24px;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
export const Description = styled.div`
  width: 100%;
  overflow: hidden;
  color: rgb(${p => p.theme.colors.bombay});
  font-weight: ${p => p.theme.fontWeights.medium};
  font-size: ${p => p.theme.fontSizes.f14};
  line-height: 24px;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const Price = styled(Box)`
  color: rgb(${p => p.theme.colors.dark});
  font-weight: ${p => p.theme.fontWeights.medium};
  font-size: ${p => p.theme.fontSizes.f16};
  line-height: 24px;
`;

export const Form = styled.form`
  position: relative;
  width: 100%;
  min-height: 540px;
`;

export const ImportButton = styled(Button).attrs({
  type: "button",
  styleName: "underline"
})`
  margin-bottom: 16px;
`;

export const Info = styled(Flex)`
  overflow: hidden;
`;

export const InfoText = styled(Flex)`
  overflow: hidden;
`;

export const Actions = styled(Flex)``;
