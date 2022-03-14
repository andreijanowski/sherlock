import styled from "styled-components";
import { Box } from "@rebass/grid";

import { H2 } from "components/styleguide/Typography";

export const Container = styled(Box)`
  margin-top: -150px;
`;

export const Title = styled(H2)`
  text-align: center;
  color: rgb(${p => p.theme.colors.b2bSecondary});
`;

export const Article = styled.div`
  padding: 10px 20px;
  margin: 0 150px;
`;
