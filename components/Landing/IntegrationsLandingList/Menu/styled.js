import styled from "styled-components";

import { H3, Body } from "components/styleguide/Typography";
import { downThanBreakpoint, themeGet } from "utils/theme";

export const List = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
  ${downThanBreakpoint(1)} {
    width: 100%;
  }
`;

export const ListGroupLabel = styled(H3).attrs({ as: "li" })`
  margin-top: 18px;
  margin-bottom: 10px;
  color: rgb(${p => p.theme.colors.landingDarkBlue});
  ${downThanBreakpoint(1)} {
    ${p =>
      `
        padding: 6px 14px;
        font-weight: ${p.theme.fontWeights.semiBold};
        font-size: ${p.theme.fontSizes.f16};
        line-height: 22px;
        color: rgb(${themeGet("colors.blue")});
        background: rgba(75, 104, 251, 0.08);
        border-radius: 9px;
    `}
  }
`;

// we dont have these colors in theme
export const ListGroupItem = styled(Body).attrs({ as: "li" })`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  padding: 6px 14px;
  color: #090a23;
  ${p =>
    p.isComingSoon &&
    `
    color: #84849C;
    cursor: not-allowed;
  `}
  ${p =>
    p.isActive &&
    `
    color: rgb(${p.theme.colors.blue});
    background: rgba(75, 104, 251, 0.08);
    border-radius: 9px;
  `}
  ${p =>
    p.onClick &&
    `
    cursor: pointer;
  `}
`;
