import styled from "styled-components";
import { Box } from "@rebass/grid";

import { H1Landing, Subtitle } from "components/styleguide/Typography";

export const Container = styled(Box)``;

export const Title = styled(H1Landing)`
  text-align: center;
`;

export const Description = styled(Subtitle)`
  text-align: center;
  max-width: 745px;
`;
