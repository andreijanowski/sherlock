import styled from "styled-components";

import { H3, Body } from "components/styleguide/Typography";

export const List = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
`;

export const ListGroupLabel = styled(H3).attrs({ as: "li" })`
  margin-top: 18px;
  margin-bottom: 10px;
  padding-left: 14px;
  color: rgb(${p => p.theme.colors.landingDarkBlue});
`;

// we dont have these colors in theme
export const ListGroupItem = styled(Body).attrs({ as: "li" })`
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
