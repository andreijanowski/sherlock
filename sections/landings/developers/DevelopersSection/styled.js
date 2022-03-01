import styled from "styled-components";
import { Flex } from "@rebass/grid";

import { WRAPPER_WIDTH } from "utils/theme";
import { H2, Subtitle } from "components/styleguide/Typography";

export const Container = styled(Flex)`
  max-width: ${WRAPPER_WIDTH}px;
  margin: auto;
  @media (min-width: ${p => p.theme.breakpoints[2]}) {
    margin-bottom: -230px;
  }
  align-items: flex-start;
`;

export const FlexWrapper = styled(Flex)`
  z-index: 1;
`;

export const H2Styled = styled(H2).attrs({ big: true })`
  max-width: 470px;
  color: rgb(${p => p.theme.colors.greyBorder});
`;

export const ImageContainer = styled.div`
  position: relative;
  border-radius: 40px;
  padding: 20px;
  background-color: ${p => `rgba(${p.theme.colors.white})`};
  width: 200%;
`;

export const Overlay = styled.div`
  position: absolute;
  border-radius: 40px 0 0 40px;
  background-color: ${p => `rgba(${p.theme.colors.blue}, 0.29)`};
  z-index: 2;
  width: 100%;
  height: 555px;
  top: 0;
  left: 0;
`;

export const FeatureImage = styled.div`
  position: absolute;
  opacity: 100%;
  top: 160px;
  left: -150px;
  @media (max-width: ${p => p.theme.breakpoints[2]}) {
    left: -10px;
  }
  z-index: 3;
`;

export const APIImage = styled.img`
  position: relative;
  @media (max-width: ${p => p.theme.breakpoints[1]}) {
    max-width: 100%;
  }
  opacity: 75%;
`;

export const Image = styled.img`
  position: relative;
  @media (max-width: ${p => p.theme.breakpoints[1]}) {
    max-width: 100%;
  }
`;

export const SubtitleStyled = styled(Subtitle).attrs({})`
  max-width: 480px;
  @media (max-width: ${p => p.theme.breakpoints[1]}) {
    max-width: 100%;
  }
  color: rgb(${p => p.theme.colors.greyBorder});
`;
