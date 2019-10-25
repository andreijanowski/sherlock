import styled from "styled-components";
import { Flex } from "@rebass/grid";

export const Wrapper = styled(Flex).attrs(() => ({
  flexDirection: "column"
}))`
  max-width: 450px;
`;
