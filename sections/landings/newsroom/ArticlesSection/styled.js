import styled from "styled-components";
import { Flex, Box } from "@rebass/grid";

import { H2, H3 } from "components/styleguide/Typography";

export const Container = styled(Box)`
  @media (min-width: ${p => p.theme.breakpoints[2]}) {
    margin-top: -150px;
  }
`;

export const FlexWrapper = styled(Flex)`
  max-width: 1100px;
  margin: 0 150px 50px;

  @media (max-width: ${p => p.theme.breakpoints[2]}) {
    margin: 0 20px 50px;
  }

  @media (min-width: ${p => p.theme.breakpoints[3]}) {
    margin: 0 auto 50px;
  }
`;

export const Title = styled(H2)`
  text-align: center;
  color: rgb(${p => p.theme.colors.b2bSecondary});
  margin-bottom: 42px;
`;

export const Article = styled.a`
  width: 100%;
  padding: 40px 0;
  border-bottom: 0.5px solid #dcdfef;
  display: flex;

  @media (max-width: ${p => p.theme.breakpoints[1]}) {
    flex-direction: column;
    margin: 0 15px;
  }
`;

export const Date = styled.div`
  color: rgb(${p => p.theme.colors.rollingStone});
  font-size: 16px;
  padding-right: 40px;
  min-width: 170px;
`;

export const Text = styled.div`
  color: rgb(${p => p.theme.colors.b2bSecondary});
  font-size: 18px;
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

export const BlogPost = styled.a`
  display: flex;
  flex-direction: column;
  margin: 44px 36px;
  max-width: 440px;
  border-radius: 10px;

  @media (max-width: ${p => p.theme.breakpoints[1]}) {
    max-width: 250px;
    margin: 10px 20px;
  }
`;

export const InfoLabel = styled.span`
  font-size: 16px;
  color: rgb(${p => p.theme.colors.b2bSecondary});
`;

export const BlogpostTitle = styled(H3)`
  font-size: 24px;
  color: rgb(${p => p.theme.colors.b2bSecondary});
  margin: 8px 0 24px;
`;

export const Summary = styled.div`
  margin-top: 16px;
  font-size: 14px;
  color: rgb(${p => p.theme.colors.b2bSecondary});
`;

export const StyledB = styled.span`
  font-weight: bold;
  color: rgb(${p => p.theme.colors.blue});
`;
