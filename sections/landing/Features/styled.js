import styled from "styled-components";
import { Flex } from "@rebass/grid";

export const FeaturesWrapper = styled(Flex).attrs(() => ({
  justifyContent: "center",
  pb: 5,
  pt: [420, 280, 220],
  mb: 4,
  mt: [-420, -280, -220]
}))`
  width: 100%;
  background: rgb(${p => p.theme.colors.blue});
`;
