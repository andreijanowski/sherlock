import styled, { css } from "styled-components";
import { Flex } from "@rebass/grid";

export const DashboardWrapper = styled(Flex)`
  flex-direction: column;
`;
export const TileWrapper = styled(Flex)`
  @media (max-width: ${p => p.theme.breakpointsPx[3]}) {
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
  ${p => p.height && `height:  ${p.height}px`};
  ${p => p.height && `max-height:  ${p.height}px`};
  background-color: ${p => `rgb(${p.theme.colors.white})`};
  position: relative;
  @media (max-width: ${p => p.theme.breakpoints[3]}) {
    margin: 6px;
  }
`;

export const TileHeader = styled.h2`
  margin: ${p => (p.isBig ? "12px" : "0 0 12px 0")};
  font-size: ${p => (p.isBig ? "28px" : "16px")};
  font-weight: 700;
  text-align: left;
`;

export const ProgressBarBackground = styled.div`
  background-color: #f2f2f2;
  width: 100%;
  border-radius: 16px;
`;

export const ProgressBar = styled(ProgressBarBackground)`
  height: 18px;
  width: ${p => `${p.width}%` || 0};
  background-color: ${p => p.color || "red"};
  transition: 0.4s;
`;

export const ProgressTitle = styled.h4`
  font-size: 12px;
  margin: 4px 0;
  color: ${p => `${p.color}` || "black"};
`;

export const Value = styled.span`
  font-size: ${p => (p.isSmall ? "12px" : "16px")};
  font-weight: 600;
  color: ${p => `${p.color}` || "black"};
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
  border-bottom: 1px dashed silver;
  margin-top: 12px;
`;

export const SalesList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  max-height: 645px;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const SalesItem = styled(Flex)`
  align-items: center;
  font-weight: 600;
  height: 70px;
  justify-content: space-between;
  border-bottom: 1px dashed silver;
`;

export const ItemNumber = styled.span`
  color: ${p => (p.isWorst ? "salmon" : "royalBlue")};
`;

export const Percentage = styled(Flex)`
  color: ${p => (p.isDown ? "salmon" : "royalBlue")};
  font-weight: 600;
`;
export const TimesOrdered = styled.div`
  font-size: 10px;
  font-weight: 200;
`;

const dropdownStyles = css`
  box-shadow: 0px 0px 10.2392px rgba(51, 51, 51, 0.15);
  border-radius: 12px;
`;

export const DropdownWrapper = styled(Flex)`
  width: 90px;
  height: 24px;
  padding: ${p => (p.withoutBorder ? "4px 0 4px 12px" : "4px; 16px")};
  position: relative;
  font-size: 10px;
  font-weight: 600;
  justify-content: ${p => (!p.withoutBorder ? "center" : "flex-end")};
  align-items: center;
  cursor: pointer;
  color: rgba(${p => p.theme.colors.darkGreyText}, 1);
  ${p => !p.withoutBorder && dropdownStyles}
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
  border-radius: 12px;
  flex-direction: column;
  padding: 12px 0;
  line-height: 16px;
  ${dropdownStyles};
`;

export const DropdownButton = styled(Flex)`
  font-size: ${p => (p.withoutBorder ? "12px" : "10px")};
  align-items: center;
  justify-content: flex-end;
  svg {
    width: ${p => (p.withoutBorder ? "10px" : "8px")};
    height: ${p => (p.withoutBorder ? "5px" : "4px")};
  }
  .DropdownArrow {
    transition: 0.1s;
    transform: ${p => (p.isDropdownOpen ? "rotate(180deg)" : "none")};
  }
`;

export const Today = styled.span`
  position: absolute;
  font-weight: 300;
  color: rgba(${p => p.theme.colors.darkGreyText}, 0.7);
  top: -16px;
`;

export const StreamList = styled(Flex)`
  flex-direction: column;
  margin-bottom: 16px;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;
export const StreamItem = styled(Flex)`
  font-size: 12px;
  font-weight: 600;
  justify-content: space-between;
  align-items: center;
  height: 92px;
  border-bottom: 1px dashed silver;
  padding: 20px 16px 24px 0px;
`;

export const StreamName = styled(Flex)`
  flex-wrap: wrap;
  width: 50%;
  line-height: 16px;
`;
export const StreamItemRight = styled(Flex)`
  height: 96px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
`;

export const Avatar = styled.div`
  height: 53px;
  width: 53px;
  border-radius: 53px;
  margin-right: 8px;
  background: rgba(${p => p.theme.colors.lightGreyText}, 0.4);
`;

export const Badge = styled.div`
  background: rgba(${p => p.theme.colors.blue}, 1);
  color: rgba(${p => p.theme.colors.white}, 1);
  border-radius: 12px;
  padding: 6px 12px;
`;

export const Time = styled.div`
  color: rgba($ ${p => p.theme.colors.lightGreyText}, 0.7);
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
