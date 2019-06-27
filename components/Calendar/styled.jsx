import styled from "styled-components";

export const CalendarWrapper = styled.div`
  overflow: hidden;
  background-color: rgb(${p => p.theme.colors.white});
  border-radius: ${p => p.theme.radius.default};
  box-shadow: 0 2px 6px 0 rgba(${p => p.theme.colors.blue}, 0.08);
  ${p => p.height && `height: ${p.height}px;`}
`;
