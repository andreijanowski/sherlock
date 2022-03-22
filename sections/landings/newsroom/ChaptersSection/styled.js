import styled from "styled-components";
import { Flex, Box } from "@rebass/grid";
import { H3 } from "components";

export const Container = styled(Box)`
  @media (min-width: ${p => p.theme.breakpoints[2]}) {
    margin: -400px 0 -350px;
  }
`;

export const FlexWrapper = styled(Flex)`
  max-width: 800px;
  margin: 0 150px 150px;

  @media (max-width: ${p => p.theme.breakpoints[2]}) {
    margin: 0 auto 50px;
  }

  @media (min-width: ${p => p.theme.breakpoints[3]}) {
    margin: 0 auto 300px;
  }
`;

export const Chapter = styled(Box)`
  margin: 20px 0;
`;

export const Title = styled(H3)`
  margin: 36px 0;
  text-align: center;
  font-size: 36px !important;
  color: rgb(${p => p.theme.colors.b2bSecondary});
  font-weight: 600;
`;

export const Description = styled.p`
  margin: 20px 0;
  font-size: 18px;
  color: rgb(${p => p.theme.colors.b2bSecondary});
  white-space: break-spaces;
`;

export const Image = styled(Box).attrs({ as: "img" })`
  margin-bottom: 12px;
  width: 100%;
  object-fit: cover;
  max-height: 400px;

  @media (max-width: ${p => p.theme.breakpoints[1]}) {
    margin: 10px auto;
  }
`;
