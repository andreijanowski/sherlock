import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex: auto;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Text = styled.p`
  max-width: 380px;
  text-align: center;
  font-size: ${p => p.theme.fontSizes.f21};
  font-weight: ${p => p.theme.fontWeights.bold};
`;
