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
  background: rgb(${p => p.theme.colors.white});
  border-radius: 32px;
  box-shadow: 0 4px 24px rgba(${p => p.theme.colors.dark}, 0.16);
`;