import styled from "styled-components";
import { Paragraph } from "components";

export const ParagraphStyled = styled(Paragraph)`
  margin: 0;
  text-align: center;
`;

export const ToHome = styled(Paragraph)`
  margin-top: 8px;
  margin-bottom: 0;
  cursor: pointer;
  text-align: center;

  :hover {
    color: rgb(${p => p.theme.colors.dark});
  }
`;
