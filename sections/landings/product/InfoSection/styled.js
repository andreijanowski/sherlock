import styled, { css } from "styled-components";
import { Flex, Box } from "@rebass/grid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { LandingContainer } from "sections/landings/common/sharedStyled";
import { H2, H3, Body } from "components/styleguide/Typography";
import {
  downThanBreakpoint,
  themeGet,
  adaptiveAbsolutePosition
} from "utils/theme";
import { AdaptiveBox } from "components/styleguide/common";

export const Container = styled(LandingContainer)``;

export const TitleIcon = styled.div`
  position: relative;
  width: 32px;
  height: 32px;
  font-size: 74px;
  svg {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  svg .primary {
    color: rgb(${p => themeGet(p.isDark ? "white" : "colors.b2bSecondary")});
  }
  svg .secondary {
    color: rgb(
      ${p => themeGet(p.isDark ? "colors.menuDarkBlue" : "colors.blue")}
    );
  }
`;

const darkCSSSupport = css`
  ${p =>
    !p.isDark &&
    `
    color: rgb(${themeGet("colors.b2bSecondary")});
  `}
`;

export const H2Styled = styled(Flex).attrs({ as: H2 })`
  ${darkCSSSupport}
  ${downThanBreakpoint(1)} {
    font-size: 24px;
    line-height: 34px;
  }
`;

export const H3Styled = styled(H3)`
  ${darkCSSSupport}
  font-weight: ${themeGet("fontWeights.semiBold")};
  ${downThanBreakpoint(2)} {
    font-size: 18px;
    line-height: 25px;
  }
`;

export const BodyStyled = styled(Body)`
  ${darkCSSSupport}
`;

export const ImagesContainer = styled(Flex)`
  width: fit-content;
  position: relative;
  flex-direction: column;
  margin: auto;
`;

export const Image = styled(Box).attrs({ as: "img" })`
  filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.2));
  ${adaptiveAbsolutePosition};
`;

export const List = styled.ul`
  margin: 6px 0 0;
  padding-left: 16px;
`;

export const ToggleOptionButton = styled(AdaptiveBox).attrs({ as: "button" })`
  width: 100%;
  position: relative;
  justify-content: center;
  padding: 7px 40px 9px;
  font-weight: ${themeGet("fontWeight.semiBold")};
  font-size: ${themeGet("fontSizes.f16")};
  line-height: ${themeGet("fontSizes.f22")};
  border-radius: 9px;
  border: none;
  background: rgb(
    ${p => themeGet(p.isDark ? "colors.white" : "colors.b2bSecondary")}
  );
  color: rgb(
    ${p => themeGet(p.isDark ? "colors.b2bSecondary" : "colors.white")}
  );
  appearance: none;
  &:not(:last-child) {
    margin-bottom: 16px;
  }
`;

export const ToggleOptionButtonIcon = styled(FontAwesomeIcon)`
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
`;
