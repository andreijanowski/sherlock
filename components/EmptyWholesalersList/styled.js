import styled, { css } from "styled-components";

import { themeGet } from "utils/theme";
import { Subtitle, Body } from "components/styleguide/Typography";

export const TextCSS = css`
  text-align: center;
  color: rgb(${themeGet("colors.darkText")});
`;

export const SubtitleStyled = styled(Subtitle)`
  ${TextCSS}
`;
export const BodyStyled = styled(Body)`
  ${TextCSS}
`;
