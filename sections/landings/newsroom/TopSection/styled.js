import styled from "styled-components";
import { Box } from "@rebass/grid";

import { H2, H3 } from "components";
import { H1Landing } from "components/styleguide/Typography";

export const Container = styled(Box)``;

export const Title = styled(H1Landing)`
  text-align: center;
`;

export const StyledH2 = styled(H2)`
  color: white;
  margin: 20px 0;
`;

export const StyledH3 = styled(H3)`
  color: white;
  margin: 20px 0;
`;

export const FeatureLabel = styled.div`
  background-color: rgb(${p => p.theme.colors.blue});
  width: 92px;
  height: 28px;
  color: rgb(${p => p.theme.colors.white});
  padding: 7px 18px;
  font-size: 12px;
  border-radius: 4px;
`;

export const MainArticle = styled.div`
  max-width: 500px;
`;

export const Image = styled(Box).attrs({ as: "img" })`
  margin: 36px;
`;
