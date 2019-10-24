import styled from "styled-components";
import { Flex } from "@rebass/grid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { calcTableColor, calcChairsColor, calcTextColor } from "./utils";

export const TableWrapper = styled(Flex).attrs(() => ({
  alignItems: "center",
  justifyContent: "center"
}))`
  position: relative;
  width: 120px;
  height: 120px;
  margin: 30px;
  background-color: rgb(
    ${p => calcTableColor(p.availibilityStatus, p.theme.colors)}
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
        ${p => calcChairsColor(p.availibilityStatus, p.theme.colors)}
      );
    }
  }
`;

export const Name = styled.span`
  color: rgb(${p => calcTextColor(p.availibilityStatus, p.theme.colors)});
  font-weight: ${p => p.theme.fontWeights.bold};
`;

export const Chair = styled(FontAwesomeIcon).attrs(() => ({
  icon: ["fa", "chair"],
  size: "xs"
}))`
  color: rgb(${p => calcTextColor(p.availibilityStatus, p.theme.colors)});
`;

export const ChairNumber = styled.span`
  margin-right: 4px;
  color: rgb(${p => calcTextColor(p.availibilityStatus, p.theme.colors)});
  font-size: ${p => p.theme.fontSizes.f12};
`;

export const ReservedBy = styled.span`
  color: rgb(${p => calcTextColor(p.availibilityStatus, p.theme.colors)});
  font-size: ${p => p.theme.fontSizes.f12};
  text-align: center;
`;
