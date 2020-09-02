import styled, { css } from "styled-components";
import Tippy from "@tippy.js/react";
import { Flex, Box } from "@rebass/grid";
import { theme } from "utils/theme";

const alignCenterMobile = css`
  text-align: center;
  @media (min-width: ${p => p.theme.breakpoints[0]}) {
    text-align: start;
  }
`;

export const NameWrapper = styled(Flex).attrs(() => ({
  flexDirection: "row",
  m: "-2px",
  flexWrap: "wrap"
}))`
  position: absolute;
  top: -10px;
  left: 16px;
  z-index: 1;
`;

export const Name = styled(Flex)`
  color: black;

  font-weight: ${p => p.theme.fontWeights.medium};
  font-size: ${p => p.theme.fontSizes.f15};
  letter-spacing: 0.3px;
  p {
    padding: 10px 30px;
    border: ${p => p.theme.borderWeights.normal} solid
      rgb(${p => p.theme.colors.blue});
    border-radius: ${p => p.theme.radius.default};
  }
`;

export const MostPopular = styled.div`
  display: flex;
  align-items: center;
  margin: 15px 2px;
  padding: 2px 6px;
  color: rgb(${p => p.theme.colors[p.color]});
  font-weight: ${p => p.theme.fontWeights.bold};
  font-size: ${p => p.theme.fontSizes.f12};
  line-height: 1.15;
  background: rgb(${p => p.theme.colors.white});
  border: ${p => p.theme.borderWeights.normal} solid
    rgb(${p => p.theme.colors[p.color]});
  border-radius: ${p => p.theme.radius.default};
`;

export const PriceWrapper = styled(Flex).attrs(() => ({
  flexDirection: "column",
  mb: 3
}))`
  position: relative;

  @media (min-width: ${p => p.theme.breakpoints[0]}) {
    display: flex;
    min-height: 130px;
  }
`;

export const PriceDescription = styled(Box)`
  ${alignCenterMobile};
  color: rgba(${p => p.theme.colors.dark}, 0.8);
  font-weight: ${p => p.theme.fontWeights.bold};
  font-size: ${p => p.theme.fontSizes.f30};
  line-height: 32px;
  letter-spacing: 0.6px;
`;

export const Billing = styled.span`
  color: rgba(${p => p.theme.colors.dark}, 0.8);
  font-weight: ${p => p.theme.fontWeights.bold};
  font-size: ${p => p.theme.fontSizes.f15};
  line-height: 32px;
  white-space: nowrap;
`;

export const Price = styled(Box)`
  ${alignCenterMobile};
  color: rgb(${p => p.theme.colors.blue});
  font-weight: ${p => p.theme.fontWeights.bold};
  font-size: ${p => p.theme.fontSizes.f30};
  line-height: 32px;
  white-space: nowrap;
  small {
    font-size: ${p => p.theme.fontSizes.f16};
  }
`;

export const RegularPrice = styled(Price)`
  margin-bottom: 0;
  font-size: ${p => p.theme.fontSizes.f16};
  line-height: 20px;
  text-decoration: line-through;
`;

export const BetaPrice = styled(Price)`
  margin-bottom: 20px;
`;

export const BetaPriceText = styled.div`
  position: absolute;
  bottom: 70px;
  color: rgb(${p => p.theme.colors.ruby});
  font-weight: ${p => p.theme.fontWeights.bold};
`;

export const Service = styled(Flex).attrs(() => ({ mb: 1 }))`
  color: ${p =>
    p.isHighlighted
      ? `rgb(${p.theme.colors.dark})`
      : `rgba(${p.theme.colors.dark}, ${p.isLighter ? 0.4 : 0.8})`};
  font-weight: ${p => (p.isHighlighted ? 700 : p.theme.fontWeights.medium)};
  font-size: ${p => p.theme.fontSizes.f16};
  line-height: 1.5;
  text-align: center;
  ${p => p.tooltipImage && "cursor:pointer;"}
`;

export const Badge = styled.span`
  margin-right: 4px;
  padding: 2px 8px;
  color: rgb(${p => p.theme.colors[p.color]});
  font-weight: ${p => p.theme.fontWeights.bold};
  font-size: ${p => p.theme.fontSizes.f14};
  line-height: 1.15;
  background: rgb(${p => p.theme.colors.white});
  border-radius: ${p => p.theme.radius.default};
`;

export const Option = styled(Box)`
  color: ${p =>
    p.dark
      ? `rgba(${p.theme.colors.dark}, 0.4)`
      : `rgb(${p.theme.colors.blue})`};
  font-weight: ${p => p.theme.fontWeights.medium};
  font-size: ${p => p.theme.fontSizes.f16};
  line-height: 1.5;
`;

export const SwitchWrapper = styled(Box)`
  height: 26px;
  padding: 2px;
  background: linear-gradient(
    to right,
    rgba(${p => p.theme.colors.dark}, 0.4),
    rgb(${p => p.theme.colors.blue})
  );
  border-radius: 13px;
`;

export const Design = styled.img`
  width: 300px;
  border-radius: ${theme.radius.default};
  box-shadow: 0 2px 6px 0 rgba(${theme.colors.blue}, 0.08);
`;

export const Tooltip = styled(Tippy)`
  padding: 0;

  .tippy-backdrop {
    background: transparent;
  }
`;

export const MainWrapper = styled(Flex).attrs(() => ({
  flexDirection: "column"
}))`
  position: relative;
  &:hover {
    ${Service} {
      color: rgba(${p => p.theme.colors.blue}, 0.8);
    }
    ${Name} {
      color: rgba(${p => p.theme.colors.blue}, 0.8);
    }
  }
`;
