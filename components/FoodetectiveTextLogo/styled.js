import styled from "styled-components";

export const LogoContainer = styled.div`
  color: rgb(${p => p.theme.colors.white});
  font-weight: ${p => p.theme.fontWeights.semiBold};
  font-size: ${p =>
    p.isSmall ? p.theme.fontSizes.f14 : p.theme.fontSizes.f18};
  line-height: ${p =>
    p.isSmall ? p.theme.fontSizes.f18 : p.theme.fontSizes.f21};
  letter-spacing: 0.5px;
`;

export const LogoSmallText = styled.div`
  font-weight: ${p => p.theme.fontWeights.medium};
`;
