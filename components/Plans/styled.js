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

export const MainWrapper = styled(Flex).attrs({
  flexDirection: "column",
  m: 2,
  pb: 3
})`
  position: relative;
  border-radius: ${p => p.theme.radius.default};
  background: rgba(${p => p.theme.colors.dark}, 0.1);
  box-shadow: 0 2px 6px 0 rgba(${p => p.theme.colors.blue}, 0.08);
`;

export const NameWrapper = styled(Flex).attrs({
  flexDirection: "row",
  m: "-2px",
  flexWrap: "wrap"
})`
  position: absolute;
  top: -10px;
  left: 16px;
`;

export const Name = styled.div`
  border-radius: ${p => p.theme.radius.default};
  box-shadow: 0 2px 6px 0 rgba(${p => p.theme.colors.dark}, 0.08);
  background: rgb(${p => p.theme.colors.white});
  font-size: ${p => p.theme.fontSizes.f12};
  font-weight: ${p => p.theme.fontWeights.bold};
  line-height: 1.15;
  padding: 2px 8px;
  margin: 2px;
  color: rgb(${p => p.theme.colors[p.color]});
`;

export const MostPopular = styled.div`
  font-size: ${p => p.theme.fontSizes.f12};
  font-weight: ${p => p.theme.fontWeights.bold};
  line-height: 1.15;
  padding: 2px 6px;
  margin: 2px;
  border: ${p => p.theme.borderWeights.tiny} solid
    rgb(${p => p.theme.colors[p.color]});
  border-radius: ${p => p.theme.radius.default};
  background: rgb(${p => p.theme.colors.white});
  color: rgb(${p => p.theme.colors[p.color]});
`;

export const PriceWrapper = styled(Flex).attrs({
  flexDirection: "column",
  mb: 3
})`
  padding: 24px 16px 16px;
  border-radius: ${p => p.theme.radius.default};
  box-shadow: 0 2px 6px 0 rgba(${p => p.theme.colors.blue}, 0.08);
  background: rgb(${p => p.theme.colors.white});
`;

export const PriceDescription = styled.div`
  margin-top: 20px;
  color: rgba(${p => p.theme.colors.dark}, 0.8);
  font-weight: ${p => p.theme.fontWeights.medium};
  font-size: ${p => p.theme.fontSizes.f16};
  line-height: 1.5;
  ${alignCenterMobile};
`;

export const Price = styled.div`
  color: rgb(${p => p.theme.colors.dark});
  font-weight: ${p => p.theme.fontWeights.semiBold};
  font-size: ${p => p.theme.fontSizes.f36};
  line-height: 1.333;
  margin-bottom: 40px;
  ${alignCenterMobile};
  small {
    font-size: ${p => p.theme.fontSizes.f16};
  }
`;

export const Service = styled(Box).attrs({ mb: 1 })`
  text-align: center;
  font-size: ${p => p.theme.fontSizes.f16};
  line-height: 1.5;
  font-weight: ${p => (p.isHighlighted ? 700 : p.theme.fontWeights.medium)};
  color: ${p =>
    p.isHighlighted
      ? `rgb(${p.theme.colors.dark})`
      : `rgba(${p.theme.colors.dark}, ${p.isLighter ? 0.4 : 0.8})`};
  ${p => p.tooltipImage && "cursor:pointer;"}
`;

export const Badge = styled.span`
  padding: 2px 8px;
  color: rgb(${p => p.theme.colors[p.color]});
  background: rgb(${p => p.theme.colors.white});
  border-radius: ${p => p.theme.radius.default};
  font-size: ${p => p.theme.fontSizes.f14};
  line-height: 1.15;
  font-weight: ${p => p.theme.fontWeights.bold};
  margin-right: 4px;
`;

export const Option = styled(Box)`
  font-size: ${p => p.theme.fontSizes.f16};
  line-height: 1.5;
  font-weight: ${p => p.theme.fontWeights.medium};
  color: ${p =>
    p.dark
      ? `rgba(${p.theme.colors.dark}, 0.4)`
      : `rgb(${p.theme.colors.blue})`};
`;

export const SwitchWrapper = styled(Box)`
  border-radius: 13px;
  padding: 2px;
  height: 26px;
  background: linear-gradient(
    to right,
    rgba(${p => p.theme.colors.dark}, 0.4),
    rgb(${p => p.theme.colors.blue})
  );
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
