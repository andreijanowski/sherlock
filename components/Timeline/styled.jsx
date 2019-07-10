import styled from "styled-components";
import { Flex, Box } from "@rebass/grid";

export const Wrapper = styled(Flex).attrs(() => ({
  width: 1
}))`
  overflow: hidden;
  background-color: ${p => `rgb(${p.theme.colors.white})`};
  border-radius: ${p => p.theme.radius.default};
  box-shadow: 0 2px 6px 0 rgba(${p => p.theme.colors.blue}, 0.08);
`;

export const SlotsWrapper = styled(Flex).attrs(() => ({}))`
  overflow: hidden;
`;

export const SlotsScroller = styled(Flex)`
  transform: translateX(${p => p.scrollPosition}px);
  transition: transform 0.8s ease-in-out;
`;

export const Slot = styled(Box).attrs(() => ({ p: 2 }))`
  font-size: ${p => p.theme.fontSizes.f12};
  text-align: center;
  border-left: 1px solid rgb(${p => p.theme.colors.linkWater});
  cursor: pointer;

  &:last-child {
    border-right: 1px solid rgb(${p => p.theme.colors.linkWater});
  }

  &:hover {
    color: rgb(${p => p.theme.colors.white});
    background-color: rgb(${p => p.theme.colors.blue});
  }
`;

export const Arrow = styled(Flex).attrs(() => ({
  alignItems: "center",
  p: 2
}))`
  box-shadow: 4px 0 6px -4px rgba(${p => p.theme.colors.blue}, 0.3);
  cursor: pointer;

  &:last-child {
    box-shadow: -4px 0 6px -4px rgba(${p => p.theme.colors.blue}, 0.3);
  }

  &:hover {
    color: rgb(${p => p.theme.colors.white});
    background-color: rgb(${p => p.theme.colors.blue});
  }
`;
