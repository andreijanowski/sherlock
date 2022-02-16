import styled from "styled-components";
import { Flex, Box } from "@rebass/grid";

import { themeGet } from "utils/theme";

export const Container = styled(Flex)`
  flex-wrap: none;
  justify-content: flex-start;
`;

export const HintContainer = styled(Box).attrs({ p: 3 })`
  max-width: 300px;
  border-radius: 12px;
  background-color: rgb(${themeGet("colors.white")});
  box-shadow: 0 1px 3px 0 rgba(${themeGet("colors.blue")}, 0.48);
`;

export const HintIcon = styled.div`
  svg {
    fill: rgb(${themeGet("colors.blue")});
    stroke: rgb(${themeGet("colors.blue")});
  }
`;
