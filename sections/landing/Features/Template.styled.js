import styled from "styled-components";

export const Screen = styled.img.attrs(p => ({
  src: `/static/img/features/${p.activeNavItem}.png`
}))`
  width: 100%;
  max-width: 512px;
`;
