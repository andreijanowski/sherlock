import styled from "styled-components";

const Input = styled(({ invalid, small, ...props }) => <input {...props} />)`
  width: 100%;
  height: 56px;
  padding: 16px;
  background-color: rgba(${p => p.theme.colors.dark}, 0.1);
  border: ${p => p.theme.borderWeights.normal} solid transparent;
  border-radius: ${p => p.theme.radius.default};
  &:hover {
    box-shadow: 0px 2px 6px 0px rgba(${p => p.theme.colors.dark}, 0.1);
  }
  &:focus {
    background-color: rgba(${p => p.theme.colors.dark}, 0.2);
    outline: none;
    box-shadow: 0px 2px 6px 0px rgba(${p => p.theme.colors.dark}, 0.1);
  }
`;

export default Input;
