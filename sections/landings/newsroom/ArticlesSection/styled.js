import styled from "styled-components";
import { Box } from "@rebass/grid";

import { H2 } from "components/styleguide/Typography";

export const Container = styled(Box)`
  margin-top: -150px;
`;

export const Title = styled(H2)`
  text-align: center;
  color: rgb(${p => p.theme.colors.b2bSecondary});
  margin-bottom: 36px;

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
