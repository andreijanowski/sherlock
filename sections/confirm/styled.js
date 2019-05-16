import styled from "styled-components";
import { Paragraph } from "components";

export const ParagraphStyled = styled(Paragraph)`
  margin: 0;
  text-align: center;
`;

export const ToLogin = styled(Paragraph)`
  margin-top: 8px;
  margin-bottom: 0;
  text-align: center;
  cursor: pointer;

  :hover {
    color: rgb(${p => p.theme.colors.dark});
  }
`;
