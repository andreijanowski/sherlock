import styled from "styled-components";

export const Image = styled.div`
  position: relative;
  width: 100%;
  background-image: url(${p => p.url});
  background-position: center;
  background-size: cover;
  border-radius: ${p => p.theme.radius.default};
`;
