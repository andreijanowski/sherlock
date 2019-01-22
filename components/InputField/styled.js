import styled, { css } from "styled-components";

const validInput = css`
  border: ${({ theme }) => theme.borderWeights.normal} solid
    rgba(${({ theme }) => theme.colors.blue}, 1);
  background-color: rgba(${({ theme }) => theme.colors.blue}, 0.1);
`;

const errorInput = css`
  background-color: rgba(${({ theme }) => theme.colors.ruby}, 0.1);
  border-color: rgba(${({ theme }) => theme.colors.ruby}, 1);
  color: rgb(${({ theme }) => theme.colors.ruby});
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};
  padding-right: 150px;
`;

export const Input = styled.input`
  width: 100%;
  height: 56px;
  padding: 16px;
  border: ${({ theme }) => theme.borderWeights.normal} solid
    rgba(${({ theme }) => theme.colors.dark}, 0);
  background-color: rgba(${({ theme }) => theme.colors.dark}, 0.1);
  border-radius: ${({ theme }) => theme.radius.default};

  &:hover {
    box-shadow: 0px 2px 6px 0px rgba(${({ theme }) => theme.colors.dark}, 0.1);
  }
  &:focus {
    background-color: rgba(${({ theme }) => theme.colors.dark}, 0.2);
    box-shadow: 0px 2px 6px 0px rgba(${({ theme }) => theme.colors.dark}, 0.1);
    outline: none;
  }

  ${({ error }) => error && errorInput}
  ${({ valid }) => valid && validInput}
`;

export const InputError = styled.span`
  color: rgb(${({ theme }) => theme.colors.ruby});
  font-size: ${({ theme }) => theme.fontSizes.f12};
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};
  position: absolute;
  right: 16px;
  top: 16px;
  line-height: 24px;
`;

export const InputContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 558px;
  margin-bottom: 8px;
`;
