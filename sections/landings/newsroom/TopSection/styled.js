import styled from "styled-components";
import { Box } from "@rebass/grid";

import { H2, H3 } from "components";
import { H1Landing } from "components/styleguide/Typography";

export const Container = styled(Box)`
  @media (max-width: ${p => p.theme.breakpoints[1]}) {
    flex-direction: column;
  }
`;

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
  display: inline;
  background-color: rgb(${p => p.theme.colors.blue});
  width: 92px;
  height: 28px;
  color: rgb(${p => p.theme.colors.white});
  padding: 7px 18px;
  font-size: 12px;
  border-radius: 4px;
`;

export const InfoLabel = styled.span`
  font-size: 16px;
  color: rgb(${p => p.theme.colors.white});
`;

export const MainArticle = styled.div`
  max-width: 500px;
`;

export const Image = styled(Box).attrs({ as: "img" })`
  margin-bottom: 42px;
  max-width: 440px;
  border-radius: 10px;

  @media (max-width: ${p => p.theme.breakpoints[1]}) {
    max-width: 250px;
    margin: 10px auto;
  }
`;
