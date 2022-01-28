import styled from "styled-components";
import { Flex } from "@rebass/grid";

import { themeGet } from "utils/theme";
import { BodySmall } from "components/styleguide/Typography";

export const Container = styled(Flex)`
  flex-wrap: nowrap;
`;

export const CheckmarkContainer = styled(Flex)`
  padding: 10px 12px;
  border-radius: 10px;
  ${p =>
    p.isDark
      ? `
    color: rgb(${themeGet("colors.white")});
    background: rgb(${themeGet("colors.white")}, 0.25);
  `
      : `
    color: rgb(${themeGet("colors.b2bSecondary")});
    background: rgb(${themeGet("colors.blue")}, 0.13);
  `}
`;

export const BodySmallStyled = styled(BodySmall)`
  ${p =>
    !p.isDark &&
    `
    color: rgb(${themeGet("colors.blackDark")});
  `}
`;
