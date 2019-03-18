import styled from "styled-components";

export const Form = styled.form`
  background: rgb(${p => p.theme.colors.white});
  padding: 16px;
  @media (min-width: ${p => p.theme.breakpoints[0]}) {
    padding: 32px;
  }
`;

export const ConfirmationMsg = styled.form`
  color: rgb(${p => p.theme.colors.carrotOrange});
`;

export const PasswordChangedMsg = styled.form`
  color: rgb(${p => p.theme.colors.green});
`;
