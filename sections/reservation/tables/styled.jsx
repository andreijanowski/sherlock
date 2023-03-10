import styled from "styled-components";
import { Flex } from "@rebass/grid";

export const Wrapper = styled(Flex).attrs(() => ({
  flexDirection: "column",
  p: 4
}))`
  background-color: rgb(${p => p.theme.colors.white});
`;

export const Table = styled(Flex).attrs(() => ({
  p: 2,
  pr: 3,
  mb: 2,
  alignItems: "center",
  justifyContent: "space-between"
}))`
  background-color: rgb(${p => p.theme.colors.white});
  border: 1px solid rgb(${p => p.theme.colors.snuff});
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

export const Price = styled.div`
  padding-right: 32px;
  color: rgb(${p => p.theme.colors.dark});
  font-weight: ${p => p.theme.fontWeights.medium};
  font-size: ${p => p.theme.fontSizes.f16};
  line-height: 24px;
`;

export const Form = styled.form`
  position: relative;
  width: 100%;
`;
