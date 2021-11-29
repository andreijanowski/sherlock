import styled from "styled-components";
import { Flex } from "@rebass/grid";

import { H2 } from "components";
import { alignCenterMobile } from "sections/common/sharedStyled";
import { WRAPPER_WIDTH } from "utils/theme";

export const Container = styled(Flex)`
  width: 100%;
  max-width: ${WRAPPER_WIDTH}px;
  justify-content: space-around;
  margin: auto;
  padding-top: 275px;
  padding-bottom: 100px;
`;

export const Image = styled.div`
  width: 100%;
  height: 100%;
  min-height: 645px;
  background-image: url("/static/img/phoneApp.png");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: contain;
`;

export const AppPlatformLogo = styled.img`
  width: auto;
  height: 40px;
  margin-right: 18px;
`;

export const NavigationLink = styled.a`
  color: rgb(${p => p.theme.colors.mischka});
  font-size: ${p => p.theme.fontSizes.f14};
  line-height: 35px;
  text-decoration: none;
  &:hover {
    color: rgb(${p => p.theme.colors.abbey});
  }
`;

export const H2Styled = styled(H2)`
  ${alignCenterMobile}
  margin: 0;
  color: black;
  font-weight: ${p => p.theme.fontWeights.semiBold};
  font-size: ${p => p.theme.fontSizes.f30};
  letter-spacing: 0.6px;
  white-space: wrap;
`;
