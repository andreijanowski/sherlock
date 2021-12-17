import styled from "styled-components";

export const Text = styled.p`
  max-width: 380px;
  text-align: center;
  font-size: ${p => p.theme.fontSizes.f21};
  font-weight: ${p => p.theme.fontWeights.bold};
`;
