import styled from "styled-components";
import { Flex } from "@rebass/grid";

import { WRAPPER_WIDTH } from "utils/theme";

export const Container = styled(Flex)`
  width: 100%;
  max-width: ${WRAPPER_WIDTH}px;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  padding: 0 16px;
`;

export const Logo = styled.img`
  display: block;
`;
