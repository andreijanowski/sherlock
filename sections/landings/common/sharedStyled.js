import styled, { css } from "styled-components";
import { Box, Flex } from "@rebass/grid";

import { H2 } from "components";
import {
  downThanBreakpoint,
  themeGet,
  LANDING_BLOCK_ANGLE,
  WRAPPER_WIDTH
} from "utils/theme";

export const alignCenterTablet = css`
  text-align: center;
  @media (min-width: ${p => p.theme.breakpoints[2]}) {
    text-align: start;
  }
`;

export const BlueText = styled.span`
  color: rgb(${p => p.theme.colors.blue});
`;

export const H2Styled = styled(H2)`
  ${alignCenterTablet}
  color: rgb(${p => p.theme.colors.white});
  font-weight: ${p => p.theme.fontWeights.semiBold};
  font-size: ${p => p.theme.fontSizes.f30};
  letter-spacing: 0.6px;
`;

export const ParagraphStyled = styled("p")`
  ${alignCenterTablet}
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
  background: linear-gradient(
    ${LANDING_BLOCK_ANGLE},
    rgb(${p => p.theme.colors.darkBlue}) calc(47% - 1px),
    rgb(${p => p.theme.colors.landingDarkBlue}) 47%
  );
`;

export const ProductsWrapper = styled(Box)`
  width: 100%;
  background: rgb(${p => p.theme.colors.landingDarkBlue});
`;

export const DevelopersAndApiWrapper = styled(Box)`
  width: 100%;
  background: linear-gradient(
    ${LANDING_BLOCK_ANGLE},
    rgb(${p => p.theme.colors.landingDarkBlue}) calc(85% - 1px),
    rgb(${p => p.theme.colors.white}) 85%
  );
  ${downThanBreakpoint(2)} {
    background: rgb(${themeGet("colors.landingDarkBlue")});
  }
`;

export const PlansWrapper = styled(Box)`
  width: 100%;
  background: white;
`;

export const GetReadyWrapper = styled(Box)`
  position: relative;
  width: 100%;
  background: rgb(${themeGet("colors.darkBlue")});
`;

export const GetReadyLandingWrapper = styled(GetReadyWrapper)`
  background: rgb(${themeGet("colors.landingDarkBlue")});
`;

export const GetReadyLandingTopGradientWrapper = styled(GetReadyWrapper)`
  padding-top: 150px;
  background: linear-gradient(
    ${LANDING_BLOCK_ANGLE},
    rgb(${themeGet("colors.white")}) calc(15% - 1px),
    rgb(${themeGet("colors.landingDarkBlue")}) 15%
  );
  ${downThanBreakpoint(2)} {
    padding-top: 0;
    background: rgb(${themeGet("colors.landingDarkBlue")});
  }
`;

export const InstallAppWrapper = styled(Box)`
  width: 100%;
  background: ${p => {
    const {
      theme: {
        colors: { darkBlue, landingDarkBlue }
      }
    } = p;
    return `linear-gradient(
    ${LANDING_BLOCK_ANGLE}, 
    rgb(${landingDarkBlue}) calc(20% - 1px), 
    white 20%, 
    white calc(80% - 1px), 
    rgb(${darkBlue}) 80%
    );`;
  }};
  ${downThanBreakpoint(2)} {
    background: linear-gradient(
      ${LANDING_BLOCK_ANGLE},
      rgb(${themeGet("colors.white")}) calc(50% - 1px),
      rgb(${themeGet("colors.darkBlue")}) 50%
    );
  }
`;

export const FooterWrapper = styled.div`
  width: 100%;
  background: rgb(${p => p.theme.colors.darkBlue});
`;

export const IntegrationsWrapper = styled(Box)`
  width: 100%;
  background: linear-gradient(
    ${LANDING_BLOCK_ANGLE},
    rgb(${p => p.theme.colors.white}) calc(90% - 1px),
    rgb(${p => p.theme.colors.landingDarkBlue}) 90%
  );
  ${downThanBreakpoint(2)} {
    background: rgb(${p => p.theme.colors.white});
  }
`;

export const LandingContainer = styled(Box)`
  max-width: ${WRAPPER_WIDTH}px;
  padding: 0 16px;
  margin: 0 auto;
`;
