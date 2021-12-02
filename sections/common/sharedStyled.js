import styled, { css } from "styled-components";
import { H2 } from "components";
import { Box, Flex } from "@rebass/grid";

const ANGLE = "177deg";

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
    ${ANGLE},
    rgb(${p => p.theme.colors.darkBlue}) calc(47% - 1px),
    rgb(${p => p.theme.colors.landingDarkBlue}) 47%
  );
`;

export const ProductsWrapper = styled(Box)`
  padding-top: 135px;
  width: 100%;
  background: rgb(${p => p.theme.colors.landingDarkBlue});
`;

export const DevelopersAndApiWrapper = styled(Box)`
  width: 100%;
  background: linear-gradient(
    ${ANGLE},
    rgb(${p => p.theme.colors.landingDarkBlue}) calc(85% - 1px),
    rgb(${p => p.theme.colors.white}) 85%
  );
`;

export const PlansWrapper = styled(Box)`
  width: 100%;
  background: white;
`;

export const GetReadyWrapper = styled(Box)`
  position: relative;
  width: 100%;
  background: rgb(${p => p.bgColor || p.theme.colors.darkBlue});
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
    ${ANGLE}, 
    rgb(${landingDarkBlue}) calc(10% - 1px), 
    white 10%, 
    white calc(75% - 1px), 
    rgb(${darkBlue}) 75%
    );`;
  }};
`;

export const FooterWrapper = styled.div`
  width: 100%;
  background: rgb(${p => p.theme.colors.darkBlue});
`;

export const IntegrationsWrapper = styled(Box)`
  width: 100%;
  background: linear-gradient(
    ${ANGLE},
    rgb(${p => p.theme.colors.white}) calc(85% - 1px),
    rgb(${p => p.theme.colors.landingDarkBlue}) 85%
  );
`;
