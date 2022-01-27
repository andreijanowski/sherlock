import styled from "styled-components";
import { Box } from "@rebass/grid";

export const Container = styled(Box)`
  text-align: center;
`;

export const Image = styled(Box).attrs({ as: "img" })`
  max-width: 100%;
  cursor: pointer;
`;

export const Video = styled(Box).attrs({ as: "iframe" })`
  max-width: 100%;
`;
