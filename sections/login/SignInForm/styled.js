import styled from "styled-components";

export const Tip = styled.span`
  color: rgba(${p => p.theme.colors.dark}, 0.64);
  font-size: 14px;
  cursor: pointer;

  :hover {
    color: rgb(${p => p.theme.colors.dark});
  }
`;
