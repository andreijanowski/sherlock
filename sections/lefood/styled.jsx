import styled from "styled-components";

export const ModalHeader = styled.h3`
  font-size: ${p => p.theme.fontSizes.f18};
  line-height: 1.5;
  color: rgb(${p => p.theme.colors.dark});
  text-align: center;
  font-weight: ${p => p.theme.fontWeights.regular};
`;
