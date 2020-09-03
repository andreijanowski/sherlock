import styled from "styled-components";

export const Brandmark = styled.img.attrs(() => ({
  src: "/static/LogoFoodetective.svg"
}))`
  max-width: 100%;
  max-height: 100%;
`;
export const SquaredBrandmark = styled.img.attrs(() => ({
  src: "/static/img/logoFoodetectiveSquared.png"
}))`
  width: 78px;
  height: 78px;
`;

export const BrandmarkWrapper = styled.div`
  width: ${p => (p.squared ? "78px" : "48px")};
  height: ${p => (p.squared ? "78px" : "48px")};
  background: rgb(${p => p.theme.colors.white});
  border-radius: ${p => (p.rounded ? "12px" : "32px")};
  box-shadow: 0 4px 24px rgba(${p => p.theme.colors.dark}, 0.16);
`;
