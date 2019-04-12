import styled from "styled-components";

export const Wrapper = styled.div`
  padding-top: 16px;
  width: ${p => p.width}px;
  height: calc(${p => p.height}px + 16px);

  @media (min-width: ${p => p.theme.breakpoints[0]}) {
    padding-top: 0;
    height: ${p => p.height}px;
  }
`;
