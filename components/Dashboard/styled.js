import styled, { css } from "styled-components";
import { Flex, Box } from "@rebass/grid";

import { downThanBreakpoint } from "utils/theme";

export const DashboardWrapper = styled(Flex)`
  flex-direction: column;
`;

export const TileWrapper = styled(Flex)`
  @media (max-width: ${p => p.theme.breakpointsPx[4]}) {
    flex-direction: column;
  }
`;

export const Tile = styled(Flex)`
  justify-content: center;
  flex-direction: ${p => (p.row ? "row" : "column")};
  box-shadow: 0px 0px 17px rgba(55, 81, 255, 0.15);
  box-sizing: border-box;
  border-radius: ${p => (p.withoutRadius ? "0px" : "13px")};
  padding: 16px;
  margin: 8px;
  ${p => p.isDisabled && "pointer-events: none; opacity: 0.4;"}
  ${p => p.height && `height: ${p.height}px`};
  ${p => p.height && `max-height: ${p.height}px`};
  background-color: ${p => `rgb(${p.theme.colors.white})`};
  position: relative;
  @media (max-width: ${p => p.theme.breakpoints[3]}) {
    margin: 6px;
  }
  ${downThanBreakpoint(2)} {
    margin: 6px 0;
  }
`;

export const TileHeader = styled(Box).attrs({ as: "h2" })`
  margin: ${p => (p.isBig ? "12px" : "0 0 12px 0")};
  font-size: ${p => (p.isBig ? "28px" : "16px")};
  font-weight: 700;
  text-align: center;
`;

export const ProgressBarBackground = styled.div`
  background-color: ${p => p.bgcolor || "transparent"};
  width: 100%;
  border-radius: 16px;
`;

export const ProgressBar = styled.div`
  height: ${p => p.height || "18px"};
  border-radius: ${p => p.radius || "16px"};
  width: ${p => p.width || 0};
  background-color: ${p => p.color || "red"};
  transition: 0.4s;
`;

export const ProgressTitle = styled.h4`
  font-size: 12px;
  margin: 4px 0;
  color: ${p => p.color || "black"};
`;

export const Value = styled.span`
  font-size: ${p => (p.isSmall ? "12px" : "16px")};
  font-weight: 600;
  color: ${p => p.color || "black"};
`;
export const Currency = styled(Value)`
  font-size: 14px;
  line-height: 18px;
  font-weight: 300;
  margin-left: 2px;
`;

export const Spacer = styled.div`
  width: 100%;
  height: 2px;
  border-bottom: 1px dashed rgb(${p => p.theme.colors.lightGreyText});
  margin-top: 12px;
`;

export const SalesList = styled.ul`
  flex: auto;
  list-style-type: none;
  padding: 0;
  margin: 0;
  max-height: 645px;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const SalesItemContainer = styled(Flex)`
  align-items: center;
  font-weight: 600;
  height: 60px;
  justify-content: space-between;
  border-bottom: 1px dashed rgb(${p => p.theme.colors.lightGreyText});
`;

export const ItemNumber = styled.span`
  color: ${p => (p.isWorst ? "salmon" : "royalBlue")};
`;

export const Percentage = styled(Flex)`
  color: ${p => (p.isDown ? "salmon" : "royalBlue")};
  font-weight: 600;
  white-space: nowrap;
`;
export const TimesOrdered = styled.div`
  font-size: 10px;
  font-weight: 200;
`;

const dropdownStyles = css`
  box-shadow: 0px 0px 10px rgba(${p => p.theme.colors.lightGreyText}, 0.2);
  border-radius: 12px;
`;

export const DropdownWrapper = styled(Flex)`
  width: 130px;
  height: 24px;
  padding: 4px 8px;
  position: relative;
  font-size: 10px;
  font-weight: 600;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: rgba(${p => p.theme.colors.darkGreyText}, 1);
  ${dropdownStyles}
  &:focus {
    outline: none;
  }
`;

export const DropdownItem = styled.div`
  width: 100%;
  padding: 0 12px;
  color: rgba(
    ${p => (p.isActive ? p.theme.colors.blue : p.theme.colors.darkGreyText)},
    0.7
  );
  &:hover {
    background: rgba(${p => p.theme.colors.blue}, 0.15);
  }
`;

export const ItemsWrapper = styled(Flex)`
  background: #fff;
  z-index: 2;
  position: absolute;
  top: 28px;
  left: 0;
  right: 0;
  border-radius: 12px;
  flex-direction: column;
  padding: 12px 0;
  line-height: 16px;
  ${dropdownStyles};
`;

export const DropdownButton = styled.div`
  position: relative;
  width: 100%;
  text-align: center;
  font-size: 10px;
  svg {
    width: 8px;
    height: 4px;
  }
  &:hover {
    transition: 0.2s;
    color: rgba(${p => p.theme.colors.darkText}, 1);
  }
  .DropdownArrow {
    position: absolute;
    top: 50%;
    right: -3px;
    transition: 0.1s;
    transform: ${p =>
      p.isDropdownOpen
        ? "translateY(-50%) rotate(180deg)"
        : "translateY(-50%)"};
  }
`;

export const DropdownLabel = styled.span`
  position: absolute;
  font-weight: 300;
  color: rgba(${p => p.theme.colors.darkGreyText}, 0.7);
  top: -16px;
  ${p => !p.isCentered && "left: 0;"}
`;

export const StreamList = styled(Flex)`
  flex: auto;
  flex-direction: column;
  margin-bottom: 16px;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;
export const StreamItemContainer = styled(Flex)`
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
  justify-content: space-between;
  align-items: center;
  height: 92px;
  border-bottom: 1px dashed silver;
  padding: 20px 16px 24px 0px;
`;

export const StreamStatus = styled(Flex)`
  flex-wrap: wrap;
  line-height: 16px;
`;
export const StreamItemRight = styled(Flex)`
  height: 96px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
`;

export const StreamLogo = styled.div`
  height: 53px;
  width: 53px;
  flex: none;
  border-radius: 50%;
  margin-right: 8px;
  ${p =>
    p.src &&
    `
    background-image: url(${p.src});
    background-size: cover;
    background-position: center
  `}
`;

export const Badge = styled.div`
  background: rgba(${p => p.theme.colors.blue}, 1);
  color: rgba(${p => p.theme.colors.white}, 1);
  border-radius: 12px;
  padding: 6px 12px;
`;

export const Time = styled.div`
  color: rgb(${p => p.theme.colors.gray["3"]});
`;

export const ArrowWrapper = styled.div`
  margin-right: 2px;
`;

export const ChevronWrapper = styled(Flex)`
  background: #fff;
  height: 48px;
  position: sticky;
  bottom: 0;
`;

export const Bullet = styled.div`
  background-color: ${p => p.background};
  border-radius: 14px;
  height: 14px;
  width: 14px;
  margin-right: 8px;
`;

export const StreamHeader = styled(Flex)`
  position: sticky;
  z-index: 3;
`;

export const EmptyData = styled.h3`
  flex: 1;
  text-align: center;
  margin: 20px 0;
`;

export const OrderDetailsContainer = styled.div`
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
`;

export const BarContainer = styled(Flex)`
  &:not(:last-child) {
    margin-bottom: 14px;
  }
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 20px 10px;
  border-bottom: 1px solid rgb(${p => p.theme.colors.border});
  padding: 20px 0;
`;

export const IconWrapper = styled.div`
  font-size: 40px;
  svg .primary {
    color: rgb(
      ${p => (p.active ? p.theme.colors.white : p.theme.colors.bombay)}
    );
  }
  svg .secondary {
    color: rgb(
      ${p => (p.active ? p.theme.colors.white : p.theme.colors.bombayDark)}
    );
  }
`;
