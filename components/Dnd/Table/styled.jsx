import styled from "styled-components";
import { Flex } from "@rebass/grid";

export const TableWrapper = styled(Flex).attrs(() => ({
  alignItems: "center",
  justifyContent: "center"
}))`
  position: relative;
  width: 120px;
  height: 120px;
  margin: 30px;
  background-color: rgb(${p => p.theme.colors.linkWater});
  border-radius: 50%;
`;

export const ChairsSpace = styled(Flex)`
  position: absolute;
  top: -5px;
  left: -5px;
  z-index: -1;
  width: 130px;
  height: 130px;

  svg {
    width: 100%;
    height: 100%;

    circle {
      stroke-width: 10;
      stroke-dasharray: ${p => (p.radius * Math.PI) / p.seats}px;
      stroke-linecap: round;
      fill: none;
      stroke: rgb(${p => p.theme.colors.blue});
    }
  }
`;

export const Name = styled.span`
  color: rgb(${p => p.theme.colors.blue});
  font-weight: ${p => p.theme.fontWeights.bold};
`;
