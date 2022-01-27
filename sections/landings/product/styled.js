import styled from "styled-components";
import { Box } from "@rebass/grid";

import { downThanBreakpoint, LANDING_BLOCK_ANGLE, themeGet } from "utils/theme";

export const TopSectionWrapper = styled.div`
  width: 100%;
  background: linear-gradient(
    ${LANDING_BLOCK_ANGLE},
    rgb(${themeGet("colors.darkBlue")}) calc(70% - 1px),
    rgb(${themeGet("colors.white")}) 70%
  );
  ${downThanBreakpoint(2)} {
    background: rgb(${themeGet("colors.darkBlue")});
  }
`;

export const WhiteWrapper = styled(Box).attrs({
  pt: [36, null, null, 30],
  pb: [80, null, null, 0]
})`
  width: 100%;
  background: rgb(${themeGet("colors.white")});
`;

export const DarkWrapper = styled(Box).attrs({
  pt: [57, null, null, 217],
  pb: [80, null, null, 182]
})`
  width: 100%;
  background: linear-gradient(
    ${LANDING_BLOCK_ANGLE},
    rgb(${themeGet("colors.white")}) calc(13% - 1px),
    rgb(${themeGet("colors.landingDarkBlue")}) 13%,
    rgb(${themeGet("colors.landingDarkBlue")}) calc(87% - 1px),
    rgb(${themeGet("colors.white")}) 87%
  );
  ${downThanBreakpoint(2)} {
    background: rgb(${themeGet("colors.landingDarkBlue")});
  }
`;

export const BenefitsWrapper = styled(Box).attrs({
  pt: [57, null, null, 217],
  pb: [18, null, null, 25]
})`
  width: 100%;
  background: linear-gradient(
    ${LANDING_BLOCK_ANGLE},
    rgb(${themeGet("colors.white")}) calc(20% - 1px),
    rgb(${themeGet("colors.landingDarkBlue")}) 20%
  );
  ${downThanBreakpoint(2)} {
    background: rgb(${themeGet("colors.landingDarkBlue")});
  }
`;

export const TopDarkWrapper = styled(DarkWrapper).attrs({
  pt: 57,
  pb: 80
})`
  background: linear-gradient(
    ${LANDING_BLOCK_ANGLE},
    rgb(${themeGet("colors.landingDarkBlue")}) calc(90% - 1px),
    rgb(${themeGet("colors.white")}) 90%
  );
`;

export const BottomDarkWrapper = styled(DarkWrapper).attrs({
  pt: [57, null, null, 217],
  pb: 0
})`
  background: linear-gradient(
    ${LANDING_BLOCK_ANGLE},
    rgb(${themeGet("colors.white")}) calc(13% - 1px),
    rgb(${themeGet("colors.landingDarkBlue")}) 13%
  );
`;
