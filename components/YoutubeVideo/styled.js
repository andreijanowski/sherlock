import styled from "styled-components";
import { Flex } from "@rebass/grid";

export const Container = styled(Flex)`
  justify-content: center;
  align-items: center;
  width: 60vw;
  height: 60vh;
  min-height: 400px;
  & > div {
    width: 100%;
    height: 100%;
  }
  @media (max-width: ${p => p.theme.breakpoints[0]}) {
    height: auto;
  }
`;
