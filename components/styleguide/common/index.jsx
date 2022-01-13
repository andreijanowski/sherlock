import React from "react";
import styled from "styled-components";
import { Flex } from "@rebass/grid";

import { downThanBreakpoint, themeGet } from "utils/theme";

export const AdaptiveBox = styled(({ display, ...restProps }) => (
  <Flex {...restProps} />
))`
  ${p => {
    const {
      theme: { breakpoints },
      display = "block"
    } = p;

    if (!Array.isArray(display)) {
      return `display: ${display};`;
    }

    const [initialDisplay, ...restDisplayValues] = display;

    return `
      display: ${initialDisplay};
      ${restDisplayValues
        .map((displayValue, index) => {
          if (!displayValue) return "";
          return `@media (min-width: ${breakpoints[index]}) {
            display: ${displayValue};
          }`;
        })
        .join("")}
    `;
  }}
`;

export const DeleteListItemBtn = styled(Flex).attrs({ as: "button" })`
  width: 60px;
  height: 60px;
  flex-shrink: 0;
  border: 1px solid rgb(${themeGet("colors.snuff")});
  border-radius: ${themeGet("radius.small")};
  justify-content: center;
  align-items: center;
  background-color: transparent;
  cursor: pointer;
  color: rgb(${themeGet("colors.ruby")});
  ${downThanBreakpoint(0)} {
    width: 54px;
    height: 54px;
  }
`;
