import styled, { css } from "styled-components";
import { Flex, Box } from "@rebass/grid";

import { LandingContainer } from "sections/landings/common/sharedStyled";
import { H2, H3, Body } from "components/styleguide/Typography";
import { themeGet } from "utils/theme";

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
`;

export const H3Styled = styled(H3)`
  ${darkCSSSupport}
  font-weight: ${themeGet("fontWeights.semiBold")};
`;

export const BodyStyled = styled(Body)`
  ${darkCSSSupport}
`;

export const ImagesContainer = styled(Flex)`
  position: relative;
  flex-direction: column;
`;

export const Image = styled(Box).attrs({ as: "img" })`
  filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.2));
  ${({ left, top, right, bottom }) => {
    const positionStyles = `
      ${top ? `left: ${top}px;` : ""}
      ${right ? `left: ${right}px;` : ""}
      ${bottom ? `left: ${bottom}px;` : ""}
      ${left ? `left: ${left}px;` : ""}
    `;

    return positionStyles.trim().length
      ? `position: absolute; ${positionStyles}`
      : "";
  }};
`;
