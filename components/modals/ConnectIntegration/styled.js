import styled from "styled-components";

import { Body, H3 } from "components/styleguide/Typography";
import { themeGet } from "utils/theme";

export const Wrapper = styled.form`
  max-width: 100%;
  width: 400px;
`;

export const ButtonsWrap = styled.div`
  display: grid;
  justify-content: flex-end;
  grid-template-columns: 1fr 1fr;
  column-gap: 18px;
  margin-top: 2em;
`;

export const Underline = styled.span`
  text-decoration: underline;
`;

export const H3Styled = styled(H3)`
  color: rgb(${themeGet("colors.darkText")});
`;

export const BodyStyled = styled(Body)`
  color: rgb(${themeGet("colors.darkText")});
  & + & {
    margin-top: 10px;
  }
`;
