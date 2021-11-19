import styled, { css } from "styled-components";
import { H2 } from "components";
import { Box, Flex } from "@rebass/grid";

export const alignCenterMobile = css`
  text-align: center;
  @media (min-width: ${p => p.theme.breakpoints[0]}) {
    text-align: start;
  }
`;

export const BlueText = styled.span`
  color: rgb(${p => p.theme.colors.blue});
`;
export const WhiteText = styled.span`
  color: rgb(${p => p.theme.colors.blue});
`;

export const H2Styled = styled(H2)`
  ${alignCenterMobile}
  color: rgb(${p => p.theme.colors.white});
  font-weight: ${p => p.theme.fontWeights.semiBold};
  font-size: ${p => p.theme.fontSizes.f30};
  letter-spacing: 0.6px;
`;

export const ParagraphStyled = styled("p")`
  ${alignCenterMobile}
  margin: 0;
  color: #e0e0e0;
  font-weight: 500;
  font-size: ${p => p.theme.fontSizes.f16};
  line-height: 20px;
  letter-spacing: 0.3px;
  ${p =>
    p.big &&
    `
    margin-bottom: 16px;
    line-height: 1.25;
    color: rgb(${p.theme.colors.white});
    font-weight: ${p.theme.fontWeights.semiBold};
    font-size: ${p.theme.fontSizes.f30};
    letter-spacing: 0.6px;
  `}
`;

export const LandingWrapper = styled(Flex)`
  width: 100%;
  background: rgb(${p => p.theme.colors.darkBlue});
`;

export const NavigationWrapper = styled(Box).attrs(() => ({}))`
  width: 100%;
  background: rgb(${p => p.theme.colors.darkBlue});
`;

export const TopSectionWrapper = styled(Box)`
  width: 100%;
  background: linear-gradient(170deg, #1a1f67 calc(47% - 1px), #020025 47%);
`;

export const ProductsWrapper = styled(Box)`
  width: 100%;
  background: linear-gradient(
      170deg,
      #020025 0%,
      #00002b 30%,
      #111247 60%,
      #12154d 70%,
      #12154d 100%
    ),
    linear-gradient(#020025 0%, #111247 60%, transparent 60%, transparent 100%);
`;

export const DevelopersAndApiWrapper = styled(Box)`
  width: 100%;
  background: linear-gradient(#12154d 0%, #0f113d 30%);
`;

export const FeaturesWrapper = styled(Box)`
  width: 100%;
  background: linear-gradient(170deg, #0f113d calc(22% - 2px), #f7f8fe 22%);
`;

export const PlansWrapper = styled(Box)`
  width: 100%;
  background: white;
`;

export const InstallAppWrapper = styled(Box)`
  width: 100%;
  background: linear-gradient(transparent 0%, transparent 85%, #eff2ff 100%),
    linear-gradient(170deg, white calc(62% - 2px), #a6b4ff 62%, #eff2ff 85%);
`;

export const FooterWrapper = styled(Flex)`
  align-items: flex-end;
  justify-content: center;
  width: 100%;
  background: linear-gradient(#eff2ff 0%, #eff2ff 100%);
`;

export const LogoWrapper = styled(Box)`
  display: none;
  @media (min-width: ${p => p.theme.breakpoints[0]}) {
    display: block;
  }
`;

export const LogoMobileWrapper = styled.div`
  @media (min-width: ${p => p.theme.breakpoints[0]}) {
    display: none;
  }
`;
