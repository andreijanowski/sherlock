import styled from "styled-components";
import { Flex, Box } from "@rebass/grid";

export const DaySwitcherWrapper = styled.div`
  position: relative;
`;

export const Wrapper = styled(Flex).attrs(() => ({
  mx: 2,
  mt: 3
}))`
  position: relative;
  max-width: 100%;
  height: 42px;
  overflow: hidden;
  background-color: ${p => `rgb(${p.theme.colors.white})`};
  border-radius: ${p => p.theme.radius.default};
  box-shadow: 0 2px 6px 0 rgba(${p => p.theme.colors.blue}, 0.08);
`;

export const TimeSlotPickerWrapper = styled(Wrapper)`
  min-width: 164px;
  max-width: calc(100% - 157px);
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

  ${p =>
    p.isActive &&
    `color: rgb(${p.theme.colors.white});
    background-color: rgb(${p.theme.colors.blue});`}

  &:last-child {
    border-right: 1px solid rgb(${p => p.theme.colors.linkWater});
  }

  &:hover {
    color: rgb(${p => p.theme.colors.white});
    background-color: rgb(${p => p.theme.colors.blue});
  }
`;

export const Date = styled(Slot)`
  width: 75px;
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
  top: 16px;
  left: 144px;
  z-index: 1;
  background-color: ${p => `rgb(${p.theme.colors.white})`};
  border-radius: ${p => p.theme.radius.default};
  box-shadow: 0 2px 6px 0 rgba(${p => p.theme.colors.blue}, 0.08);
`;
