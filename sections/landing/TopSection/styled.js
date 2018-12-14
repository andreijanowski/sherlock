import styled from "styled-components";
import { Box } from "@rebass/grid";

export const Content = styled(Box).attrs({
  mb: 5,
  alignSelf: "center"
})`
  max-width: 896px;
`;

export const LogoWrapper = styled(Box).attrs({
  mb: 5
})`
  margin-left: -76px;
`;
