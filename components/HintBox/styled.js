import styled from "styled-components";
import { Flex, Box } from "@rebass/grid";

import { themeGet } from "utils/theme";

export const Container = styled(Flex)`
  flex-wrap: none;
  justify-content: flex-start;
  align-items: center;
`;

export const HintContainer = styled(Box).attrs({ p: 3 })`
  font-size: 12px;
  width: 100%;
  max-width: 700px;
  border-radius: 12px;
  background-color: rgb(${themeGet("colors.white")});
  box-shadow: 0 1px 3px 0 rgba(${themeGet("colors.blue")}, 0.48);
`;

export const HintIcon = styled(Box)`
  cursor: pointer;
  svg {
    fill: rgb(${themeGet("colors.blue")});
    stroke: rgb(${themeGet("colors.blue")});
  }
`;
