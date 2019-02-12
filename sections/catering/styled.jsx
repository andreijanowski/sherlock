/* eslint-disable import/prefer-default-export */
import styled from "styled-components";

export const CalendarWrapper = styled.div`
  background-color: rgb(${p => p.theme.colors.white});
  box-shadow: 0 2px 6px 0 rgba(${p => p.theme.colors.blue}, 0.08);
  height: 550px;
  border-radius: ${p => p.theme.radius.default};
  overflow: hidden;
`;
