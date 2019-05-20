import styled from "styled-components";

export const Wrapper = styled.div`
  width: ${p => p.width}px;
  height: calc(${p => p.height}px + 16px);
  padding-top: 16px;

  @media (min-width: ${p => p.theme.breakpoints[0]}) {
    height: ${p => p.height}px;
    padding-top: 0;
  }
`;
