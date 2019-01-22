import styled from "styled-components";

export const RadioButtonLabel = styled.span`
  color: rgba(${({ theme }) => theme.colors.dark}, 0.4);
  border: ${({ theme }) => theme.borderWeights.normal} solid
    rgba(${({ theme }) => theme.colors.dark}, 0);
  background-color: rgba(${({ theme }) => theme.colors.dark}, 0.1);
  border-radius: ${({ theme }) => theme.radius.default};
  display: inline-block;
  padding: 16px;
  cursor: pointer;
  text-align: center;

  &:hover {
    box-shadow: 0px 2px 6px 0px rgba(${({ theme }) => theme.colors.dark}, 0.1);
  }
  &:focus {
    background-color: rgba(${({ theme }) => theme.colors.dark}, 0.2);
    box-shadow: 0px 2px 6px 0px rgba(${({ theme }) => theme.colors.dark}, 0.1);
    outline: none;
  }
  & > input {
    width: 120px;
    border: none;
    text-align: center;
    background: transparent;
    outline: none;
    padding: 0;
  }
`;

export const RadioButtonContainer = styled.label`
  position: relative;
  cursor: pointer;
`;

export const RadioButton = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  &:checked + ${RadioButtonLabel} {
    color: rgba(${({ theme }) => theme.colors.dark}, 1);
    border: ${({ theme }) => theme.borderWeights.normal} solid
      rgba(${({ theme }) => theme.colors.blue}, 1);
    background-color: rgba(${({ theme }) => theme.colors.blue}, 0.1);
  }
`;
