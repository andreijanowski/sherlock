import styled from "styled-components";
import { Flex } from "@rebass/grid";

export const Form = styled(Flex).attrs({
  as: "form",
  flexDirection: "column",
  p: [3, 4],
  width: 1
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
  background-image: url(${p => p.url});
  background-size: cover;
  background-position: center;
  width: 100%;
  border-radius: ${p => p.theme.radius.default};
  position: relative;
`;

export const FileIconWrapper = styled(Flex).attrs({
  width: "60px",
  alignItems: "center",
  justifyContent: "center",
  as: "a",
  target: "_blank"
})`
  height: 60px;
  background-color: rgb(${p => p.theme.colors.white});
  color: rgb(${p => p.theme.colors.blue});
  border-radius: ${p => p.theme.radius.default};
  cursor: pointer;

  &:hover {
    background-color: rgb(${p => p.theme.colors.blue});
    color: rgb(${p => p.theme.colors.white});
  }
`;

export const DropzoneWrapper = styled(Flex)`
  min-height: 120px;
`;
