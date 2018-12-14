import styled from "styled-components";

export const Brandmark = styled.img.attrs({
  src: "/static/LogoFoodetective.svg"
})`
  max-width: 100%;
  max-height: 100%;
`;

export const BrandmarkWrapper = styled.div`
  width: 64px;
  height: 64px;
  padding: 12px;
  background: rgb(${p => p.theme.colors.white});
  border-radius: 32px;
  box-shadow: 0 4px 24px rgba(${p => p.theme.colors.dark}, 0.16);
`;

export const Wordmark = styled.div`
  font-size: ${p => p.theme.fontSizes.f36};
  color: rgb(${p => p.theme.colors.dark});
  font-weight: 600;
  margin: 0 8px 0 12px;
`;

export const Tagline = styled.div`
  font-size: ${p => p.theme.fontSizes.f24};
  color: rgba(${p => p.theme.colors.dark}, 0.4);
  font-weight: 600;
`;
