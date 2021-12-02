import styled from "styled-components";

import { downThanBreakpoint } from "utils/theme";

export const LogoContainer = styled.div`
  color: rgb(
    ${p => (p.isDark ? p.theme.colors.landingDarkBlue : p.theme.colors.white)}
  );
  font-weight: ${p => p.theme.fontWeights.semiBold};
  font-size: ${p =>
    p.isSmall ? p.theme.fontSizes.f14 : p.theme.fontSizes.f18};
  line-height: ${p =>
    p.isSmall ? p.theme.fontSizes.f18 : p.theme.fontSizes.f21};
  letter-spacing: 0.5px;
  ${downThanBreakpoint(2)} {
    font-size: ${p => p.theme.fontSizes.f14};
    line-height: ${p => p.theme.fontSizes.f18};
  }
`;

export const LogoSmallText = styled.div`
  font-weight: ${p => p.theme.fontWeights.medium};
`;
