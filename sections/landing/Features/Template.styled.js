import styled from "styled-components";
import { Flex } from "@rebass/grid";

export const Screen = styled.img.attrs(p => ({
  src: `/static/img/features/${p.activeNavItem}.png`
}))`
  width: 100%;
  max-width: 512px;
  color: black;
`;

export const DescriptionWrapper = styled(Flex).attrs(() => ({
  flexDirection: "column",
  width: [1, 1 / 2],
  flex: ["none", 1],
  p: 2
}))`
  @media (min-width: ${p => p.theme.breakpoints[0]}) {
    height: 300px;
  }
`;
