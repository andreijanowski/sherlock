import styled from "styled-components";
import { Flex } from "@rebass/grid";

export const FileIconWrapper = styled(Flex).attrs({
  width: "60px",
  alignItems: "center",
  justifyContent: "center",
  as: "a",
  target: "_blank",
  rel: "noreferrer noopener"
})`
  height: 60px;
  color: rgb(${p => p.theme.colors.blue});
  background-color: rgb(${p => p.theme.colors.white});
  border-radius: ${p => p.theme.radius.default};
  cursor: pointer;

  &:hover {
    color: rgb(${p => p.theme.colors.white});
    background-color: rgb(${p => p.theme.colors.blue});
  }
`;

export const DropzoneWrapper = styled(Flex)`
  min-height: 120px;
`;
