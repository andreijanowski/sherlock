import styled from "styled-components";
import { Flex } from "@rebass/grid";
import { StyledButton as StyleButton } from "components";

export const Wrapper = styled(Flex).attrs(() => ({
  flexDirection: "column",
  p: 4
}))`
  background-color: rgb(${p => p.theme.colors.white});
`;

export const Widget = styled(Flex).attrs(() => ({
  p: 2,
  pr: 3,
  mb: 2,
  alignItems: "center",
  justifyContent: "space-between"
}))`
  background-color: rgb(${p => p.theme.colors.white});
  border: 1px solid rgb(${p => p.theme.colors.snuff});
  border-radius: ${p => p.theme.radius.default};
  cursor: pointer;

  &:hover {
    background-color: rgba(${p => p.theme.colors.snuff}, 0.25);
  }
`;

export const Domain = styled.div`
  width: 100%;
  color: rgb(${p => p.theme.colors.dark});
  font-weight: ${p => p.theme.fontWeights.medium};
  font-size: ${p => p.theme.fontSizes.f16};
  line-height: 24px;
  word-wrap: break-word;
`;
export const ApiKey = styled.div`
  width: 100%;
  color: rgb(${p => p.theme.colors.bombay});
  font-weight: ${p => p.theme.fontWeights.medium};
  font-size: ${p => p.theme.fontSizes.f14};
  line-height: 24px;
  word-wrap: break-word;
`;

export const Form = styled.form`
  position: relative;
  width: 100%;
`;

export const StyledButton = styled(StyleButton)`
  font-family: monospace;
  word-wrap: break-word;
  cursor: text;
`;
