import styled from "styled-components";
import { Box, Flex } from "@rebass/grid";

import { themeGet } from "utils/theme";

export const IconContainer = styled(Box)`
  font-size: 36px;
`;

export const Business = styled(Box)`
  font-weight: ${themeGet("fontWeights.medium")};
`;

export const LogoContainer = styled(Flex)`
  color: rgb(
    ${p => (p.isDark ? p.theme.colors.landingDarkBlue : p.theme.colors.white)}
  );
  font-weight: ${themeGet("fontWeights.semiBold")};
  font-size: ${themeGet("fontSizes.f18")};
  line-height: ${themeGet("fontSizes.f18")};
  letter-spacing: 0.5px;
  padding: 9px;
`;
