import styled from "styled-components";
import { Flex } from "@rebass/grid";

export const LoadingWrapper = styled(Flex).attrs({
  width: 1,
  alignItems: "center",
  justifyContent: "center"
})`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background-color: ${p =>
    p.hasTransparentBackground ? "none" : `rgb(${p.theme.colors.background})`};
`;
