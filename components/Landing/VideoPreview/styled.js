import styled from "styled-components";
import { Flex, Box } from "@rebass/grid";

export const Container = styled(Flex)``;

export const Image = styled(Box).attrs({ as: "img" })`
  max-width: 100%;
  cursor: pointer;
`;

export const Video = styled(Box).attrs({ as: "iframe" })`
  max-width: 100%;
`;
