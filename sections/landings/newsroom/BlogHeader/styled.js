import styled from "styled-components";
import { Flex, Box } from "@rebass/grid";
import { H1Landing } from "components/styleguide/Typography";

export const Container = styled(Box)`
  @media (max-width: ${p => p.theme.breakpoints[1]}) {
    flex-direction: column;
  }
`;

export const BackArrow = styled.button`
  margin: 12px 0;
  width: 150px;
  background-color: transparent;
  color: rgb(${p => p.theme.colors.white});
  border: 0;
  cursor: pointer;

  @media (min-width: ${p => p.theme.breakpoints[2]}) {
    margin-left: -150px;
  }
`;

export const FlexWrapper = styled(Flex)`
  max-width: 800px;
  margin: 0 150px 250px;

  @media (max-width: ${p => p.theme.breakpoints[2]}) {
    margin: 0 auto 50px;
  }

  @media (min-width: ${p => p.theme.breakpoints[2]}) {
    margin: 0 auto 400px;
  }
`;

export const Summary = styled.div`
  margin-top: 16px;
  font-size: 14px;
  color: rgb(${p => p.theme.colors.white});
`;

export const InfoLabel = styled.span`
  display: flex;
  align-items: center;
  font-size: 16px;
  margin: 16px 0;
  color: rgb(${p => p.theme.colors.white});
`;

export const Icon = styled.img`
  width: 22px;
  height: 22px;
  margin-right: 6px;
`;

export const Title = styled(H1Landing)`
  text-align: center;
  font-size: 46px;
`;

export const Image = styled(Box).attrs({ as: "img" })`
  margin-bottom: 12px;
  width: 100%;
  object-fit: cover;
  border-radius: 10px;
  max-height: 400px;

  @media (max-width: ${p => p.theme.breakpoints[1]}) {
    margin: 10px auto;
  }
`;
