import styled from "styled-components";

export const Body = styled.div`
  line-height: 1.5;
  max-width: 400px;
  padding: 1em 0 0;

  @media screen and (min-width: 640px) {
    padding-top: 0;
  }
`;

export const ButtonsWrap = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 2em 0 0;
`;

export const Content = styled.div`
  text-align: ${p => (p.center ? "center" : "")};
`;

export const Icon = styled.div`
  margin: 0 0 1em;
  text-align: center;
`;
