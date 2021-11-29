import styled from "styled-components";
import { Box } from "@rebass/grid";

import { WRAPPER_WIDTH } from "utils/theme";

export const Container = styled(Box)`
  max-width: ${WRAPPER_WIDTH}px;
  margin: auto;
`;
