import styled from "styled-components";
import { Box } from "@rebass/grid";

export const SectionItem = styled(Box).attrs(() => ({
  as: "li",
  px: 3,
  width: [1 / 2, "auto"]
}))`
  display: none;
  @media (min-width: ${p => p.theme.breakpoints[0]}) {
    display: block;
  }
`;
