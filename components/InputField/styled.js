import styled, { css } from "styled-components";

const validInput = css`
  border: ${p => p.theme.borderWeights.tiny} solid
    rgba(${p => p.theme.colors.green}, 1);
  background-color: rgba(${p => p.theme.colors.green}, 0.1);
`;

const errorInput = css`
  background-color: rgba(${p => p.theme.colors.ruby}, 0.1);
  border-color: rgba(${p => p.theme.colors.ruby}, 1);
  color: rgb(${p => p.theme.colors.ruby});
  font-weight: ${p => p.theme.fontWeights.semiBold};
`;

export const Input = styled.input`
  width: 100%;
  height: 56px;
  padding: 16px;
  border: ${p => p.theme.borderWeights.tiny} solid
    rgba(${p => p.theme.colors.dark}, 0);
  background-color: rgba(${p => p.theme.colors.dark}, 0.1);
  border-radius: ${p => p.theme.radius.default};

  &:hover {
    box-shadow: 0px 2px 6px 0px rgba(${p => p.theme.colors.dark}, 0.1);
  }
  &:focus {
    background-color: rgba(${p => p.theme.colors.dark}, 0.2);
    box-shadow: 0px 2px 6px 0px rgba(${p => p.theme.colors.dark}, 0.1);
    outline: none;
  }

  ${({ error }) => error && errorInput}
  ${({ valid }) => valid && validInput}
`;

export const InputError = styled.span`
  color: rgb(${p => p.theme.colors.ruby});
  font-size: ${p => p.theme.fontSizes.f12};
  font-weight: ${p => p.theme.fontWeights.semiBold};
  position: absolute;
  left: 0;
  top: 52px;
  line-height: 24px;
`;

export const InputContainer = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 16px;
`;
