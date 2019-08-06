import styled from "styled-components";
import { Flex } from "@rebass/grid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const TableWrapper = styled(Flex).attrs(() => ({
  alignItems: "center",
  justifyContent: "center"
}))`
  position: relative;
  width: 120px;
  height: 120px;
  margin: 30px;
  background-color: rgb(
    ${p => {
      if (p.isDropDisabled) {
        return p.theme.colors.ruby;
      }
      if (p.isDraggingOver) {
        return p.theme.colors.green;
      }
      return p.theme.colors.linkWater;
    }}
  );
  border-radius: 50%;
  cursor: pointer;
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
      stroke: rgb(
        ${p => {
          if (p.isDropDisabled) {
            return p.theme.colors.ruby;
          }
          if (p.isDraggingOver) {
            return p.theme.colors.green;
          }
          return p.theme.colors.blue;
        }}
      );
    }
  }
`;

export const Name = styled.span`
  color: rgb(
    ${p =>
      p.isDraggingOver || p.isDropDisabled
        ? p.theme.colors.white
        : p.theme.colors.blue}
  );
  font-weight: ${p => p.theme.fontWeights.bold};
`;

export const Chair = styled(FontAwesomeIcon).attrs(() => ({
  icon: ["fa", "chair"],
  size: "xs"
}))`
  color: rgb(
    ${p =>
      p.isDraggingOver || p.isDropDisabled
        ? p.theme.colors.white
        : p.theme.colors.blue}
  );
`;

export const ChairNumber = styled.span`
  margin-right: 4px;
  color: rgb(
    ${p =>
      p.isDraggingOver || p.isDropDisabled
        ? p.theme.colors.white
        : p.theme.colors.blue}
  );
  font-size: ${p => p.theme.fontSizes.f12};
`;
