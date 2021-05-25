import styled from "styled-components";
import { Flex } from "@rebass/grid";

export const DevelopersAndApiWrapper = styled(Flex).attrs(() => ({
  justifyContent: "start",
  px: 3
}))`
  flex-direction: column;
  max-width: 1150px;
  margin: auto;
`;
