import React from "react";
import styled from "styled-components";
import { Flex } from "@rebass/grid";

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
