import styled from "styled-components";
import { Box } from "@rebass/grid";

import { H2, H3 } from "components/styleguide/Typography";

export const Container = styled(Box)`
  margin-top: -150px;
`;

export const Title = styled(H2)`
  text-align: center;
  color: rgb(${p => p.theme.colors.b2bSecondary});
  margin-bottom: 42px;

  @media (max-width: ${p => p.theme.breakpoints[1]}) {
    color: rgb(${p => p.theme.colors.white});
  }
`;

export const Article = styled.a`
  padding: 40px 0;
  margin: 0 150px;
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

export const BlogPost = styled.div`
  display: flex;
  flex-direction: column;
  margin: 44px 36px;
  max-width: 440px;
  border-radius: 10px;

  @media (max-width: ${p => p.theme.breakpoints[1]}) {
    max-width: 250px;
    margin: 10px auto;
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
