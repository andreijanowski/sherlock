import styled from "styled-components";
import { Box, Flex } from "@rebass/grid";

export const CalendarWrapper = styled.div`
  background-color: rgb(${p => p.theme.colors.white});
  box-shadow: 0 2px 6px 0 rgba(${p => p.theme.colors.blue}, 0.08);
  border-radius: ${p => p.theme.radius.default};
  overflow: hidden;
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
  right: 0;
  top: -66px;
  @media (min-width: ${p => p.theme.breakpoints[0]}) {
    position: static;
  }
`;

export const Form = styled.form`
  background: rgb(${p => p.theme.colors.white});
  padding: 16px;
  @media (min-width: ${p => p.theme.breakpoints[0]}) {
    padding: 32px;
  }
`;
