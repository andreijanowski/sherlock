import styled from "styled-components";
import { Box, Flex } from "@rebass/grid";

export const CalendarWrapper = styled.div`
  overflow: hidden;
  background-color: rgb(${p => p.theme.colors.white});
  border-radius: ${p => p.theme.radius.default};
  box-shadow: 0 2px 6px 0 rgba(${p => p.theme.colors.blue}, 0.08);
  ${p => p.height && `height: ${p.height}px;`}
`;

export const ActionBarWrapper = styled(Flex)`
  position: relative;
  @media (min-width: ${p => p.theme.breakpoints[0]}) {
    position: static;
  }
`;

export const AddIconWrapper = styled(Box)`
  position: absolute;
  top: -66px;
  right: 0;
  @media (min-width: ${p => p.theme.breakpoints[0]}) {
    position: static;
  }
`;

export const Form = styled.form`
  padding: 16px;
  background: rgb(${p => p.theme.colors.white});
  @media (min-width: ${p => p.theme.breakpoints[0]}) {
    padding: 32px;
  }
`;
