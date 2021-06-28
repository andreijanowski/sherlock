import styled from "styled-components";

const TRANSITION_TIME = "0.3s";

export const RectangleRadioButtonLabel = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 16px;
  color: rgba(${p => p.theme.colors.dark}, 0.4);
  text-align: center;
  background-color: rgba(${p => p.theme.colors.dark}, 0.1);
  border: ${p => p.theme.borderWeights.normal} solid
    rgba(${p => p.theme.colors.dark}, 0);
  border-radius: ${p => p.theme.radius.default};
  cursor: pointer;

  &:hover {
    box-shadow: 0px 2px 6px 0px rgba(${p => p.theme.colors.dark}, 0.1);
  }
  &:focus {
    background-color: rgba(${p => p.theme.colors.dark}, 0.2);
    outline: none;
    box-shadow: 0px 2px 6px 0px rgba(${p => p.theme.colors.dark}, 0.1);
  }
  & > input {
    padding: 0;
    text-align: center;
    background: transparent;
    border: none;
    outline: none;
  }
`;

export const CircleRadioButtonLabel = styled.span`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  position: relative;
  &:before {
    content: "";
    min-width: 15px;
    min-height: 15px;
    margin-right: 15px;
    border: 3px solid rgb(${p => p.theme.colors.importGray});
    border-radius: 50%;
    transition: border-color ${TRANSITION_TIME};
  }
  &:after {
    content: "";
    width: 11px;
    height: 11px;
    position: absolute;
    left: 5px;
    top: 5px;
    background-color: transparent;
    border-radius: 50%;
    transition: background-color ${TRANSITION_TIME};
  }
`;

export const RadioButtonContainer = styled.label`
  position: relative;
  width: 100%;
  cursor: pointer;
`;

export const RadioButton = styled.input`
  position: absolute;
  cursor: pointer;
  opacity: 0;
  &:checked + ${RectangleRadioButtonLabel} {
    color: rgba(${p => p.theme.colors.dark}, 1);
    background-color: rgba(${p => p.theme.colors.blue}, 0.1);
    border: ${p => p.theme.borderWeights.normal} solid
      rgba(${p => p.theme.colors.blue}, 1);
  }
  &:checked + ${CircleRadioButtonLabel} {
    &:before {
      border-color: rgb(${p => p.theme.colors.blue});
    }
    &:after {
      background-color: rgb(${p => p.theme.colors.blue});
    }
  }
`;
