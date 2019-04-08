import styled from "styled-components";

export const Tip = styled.span`
  font-size: 14px;
  color: rgba(${p => p.theme.colors.dark}, 0.64);
  cursor: pointer;

  :hover {
    color: rgb(${p => p.theme.colors.dark});
  }
`;
