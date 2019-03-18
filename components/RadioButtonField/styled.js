import styled from "styled-components";

export const RadioButtonLabel = styled.span`
  color: rgba(${p => p.theme.colors.dark}, 0.4);
  border: ${p => p.theme.borderWeights.normal} solid
    rgba(${p => p.theme.colors.dark}, 0);
  background-color: rgba(${p => p.theme.colors.dark}, 0.1);
  border-radius: ${p => p.theme.radius.default};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
  cursor: pointer;
  text-align: center;
  width: 100%;
  height: 100%;

  &:hover {
    box-shadow: 0px 2px 6px 0px rgba(${p => p.theme.colors.dark}, 0.1);
  }
  &:focus {
    background-color: rgba(${p => p.theme.colors.dark}, 0.2);
    box-shadow: 0px 2px 6px 0px rgba(${p => p.theme.colors.dark}, 0.1);
    outline: none;
  }
  & > input {
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
  width: 100%;
`;

export const RadioButton = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  &:checked + ${RadioButtonLabel} {
    color: rgba(${p => p.theme.colors.dark}, 1);
    border: ${p => p.theme.borderWeights.normal} solid
      rgba(${p => p.theme.colors.blue}, 1);
    background-color: rgba(${p => p.theme.colors.blue}, 0.1);
  }
`;
