import styled from "styled-components";

export const Form = styled.form`
  background: rgb(${p => p.theme.colors.white});
  padding: 32px;
`;

export const ConfirmationMsg = styled.form`
  color: rgb(${p => p.theme.colors.carrotOrange});
`;

export const PasswordChangedMsg = styled.form`
  color: rgb(${p => p.theme.colors.green});
`;
