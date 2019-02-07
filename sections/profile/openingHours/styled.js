import styled from "styled-components";

export const Copy = styled.span`
  font-size: ${p => p.theme.fontSizes.f14};
  color: rgb(${p => p.theme.colors.blue});
  cursor: pointer;
`;

export const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: rgb(${p => p.theme.colors.snuff});
`;
