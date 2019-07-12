import styled from "styled-components";
import { Flex, Box } from "@rebass/grid";

export const DaySwitcherWrapper = styled(Flex).attrs(() => ({
  mx: 2,
  mt: 3
}))`
  position: relative;
  max-width: 100%;
  height: 42px;
  background-color: ${p => `rgb(${p.theme.colors.white})`};
  border-radius: ${p => p.theme.radius.default};
  box-shadow: 0 2px 6px 0 rgba(${p => p.theme.colors.blue}, 0.08);
`;

export const TimeSlotPickerWrapper = styled(DaySwitcherWrapper)`
  max-width: calc(100% - 152px);
  overflow: hidden;
`;

export const SlotsWrapper = styled(Flex)`
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

export const Date = styled(Slot)`
  width: 70px;
`;

export const Arrow = styled(Flex).attrs(() => ({
  alignItems: "center",
  p: 2,
  width: "25px"
}))`
  box-shadow: ${p => (p.left ? "4px" : "-4px")} 0 6px -4px rgba(${p => p.theme.colors.blue}, 0.3);
  cursor: pointer;

  &:hover {
    color: rgb(${p => p.theme.colors.white});
    background-color: rgb(${p => p.theme.colors.blue});
  }
`;

export const CalendarIcon = styled(Flex).attrs(() => ({
  alignItems: "center",
  justifyContent: "center",
  p: 2,
  width: "42px"
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

export const DayPickerWrapper = styled.div`
  position: absolute;
  left: 136px;
  z-index: 1;
  background-color: ${p => `rgb(${p.theme.colors.white})`};
  border-radius: ${p => p.theme.radius.default};
  box-shadow: 0 2px 6px 0 rgba(${p => p.theme.colors.blue}, 0.08);
`;
