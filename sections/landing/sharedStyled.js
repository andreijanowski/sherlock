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
  white-space: nowrap;
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
  color: rgb(${p => p.theme.colors.white});
  font-weight: ${p => p.theme.fontWeights.semiBold};
  font-size: ${p => p.theme.fontSizes.f16};
  line-height: 24px;
  letter-spacing: 1.2px;
  @media (min-width: ${p => p.theme.breakpoints[0]}) {
    font-size: ${p => p.theme.fontSizes.f30};
    line-height: 40px;
  }
`;

export const LandingWrapper = styled(Flex)`
  width: 100%;
  background: rgb(${p => p.theme.colors.darkBlue});
`;

export const NavigationWrapper = styled(Box).attrs(() => ({
  px: 3
}))`
  width: 100%;
  max-width: 1150px;
`;

export const TopSectionWrapper = styled(Box).attrs()`
  width: 100%;
  background: linear-gradient(170deg, #1a1f67 50%, #020025 50%);
`;

export const ProductsWrapper = styled(Box).attrs()`
  width: 100%;
  background: linear-gradient(
    180deg,
    #00002b 0%,
    #222f8c 60%,
    #1a2375 70%,
    #0d1237 92%,
    #0a0e2a 95%,
    #000 100%
  );
`;
export const DevelopersAndApiWrapper = styled(Box).attrs()`
  z-index: 2;
  width: 100%;
  height: 500px;
  background: linear-gradient(170deg, #000 90%, #fff 90%);
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
