import styled from "styled-components";

export const Form = styled.form`
  padding: 16px;
  background: rgb(${p => p.theme.colors.white});
  @media (min-width: ${p => p.theme.breakpoints[0]}) {
    padding: 32px;
  }
`;
