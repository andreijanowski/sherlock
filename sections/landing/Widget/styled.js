import styled from "styled-components";

export const WidgetExample = styled.img.attrs(() => ({
  src: `/static/img/widget/example.png`
}))`
  width: auto;
  max-width: 100%;
  object-fit: contain;
`;
