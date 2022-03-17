import styled from "styled-components";
import { Flex, Box } from "@rebass/grid";
import { H2, H3 } from "components";
import { H1Landing } from "components/styleguide/Typography";

export const Container = styled(Box)`
  @media (max-width: ${p => p.theme.breakpoints[1]}) {
    flex-direction: column;
  }
`;

export const FlexWrapper = styled(Flex)`
  max-width: 1100px;
  margin: 0 150px 250px;

  @media (max-width: ${p => p.theme.breakpoints[2]}) {
    margin: 0 20px 50px;
  }

  @media (min-width: ${p => p.theme.breakpoints[3]}) {
    margin: 0 auto 250px;
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

  @media (max-width: ${p => p.theme.breakpoints[0]}) {
    margin-bottom: 6px;
    display: block;
  }
`;

export const InfoLabel = styled.span`
  font-size: 16px;
  margin-right: 12px;
  color: rgb(${p => p.theme.colors.white});
`;

export const MainArticle = styled.a`
  display: block;
  max-width: 500px;
`;

export const Image = styled(Box).attrs({ as: "img" })`
  margin-bottom: 12px;
  width: 440px;
  max-height: 230px;
  object-fit: cover;
  border-radius: 10px;

  @media (max-width: ${p => p.theme.breakpoints[1]}) {
    max-width: 250px;
    margin: 10px auto;
  }
`;
