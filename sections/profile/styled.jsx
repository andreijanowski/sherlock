import styled from "styled-components";
import { Flex } from "@rebass/grid";

export const Form = styled(Flex).attrs({
  as: "form",
  flexDirection: "column",
  p: 4
})`
  background-color: rgb(${p => p.theme.colors.white});
  border-radius: ${p => p.theme.radius.default};
  box-shadow: 0 2px 6px 0 rgba(${p => p.theme.colors.blue}, 0.08);
`;

export const Actions = styled(Flex).attrs({
  width: 96,
  mb: 3
})``;

export const Image = styled.div`
  background-image: url(${p => p.src});
  background-size: cover;
  background-position: center;
  width: 100%;
  border-radius: ${p => p.theme.radius.default};
  position: relative;
`;
