import styled from "styled-components";
import { Flex, Box } from "@rebass/grid";

export const MainWrapper = styled.div`
  max-width: 960px;
  margin-bottom: 40px;
  margin-left: 16px;
  margin-right: 16px;
  position: relative;
  @media (min-width: ${p => p.theme.breakpoints[0]}) {
    margin-bottom: 80px;
  }
`;

export const ServicesWrapper = styled(Flex).attrs({
  p: [3, 4],
  flexDirection: "column",
  width: 1
})`
  position: relative;
  z-index: 1;
  border-radius: ${p => p.theme.radius.double};
  background: rgb(${p => p.theme.colors.dark});
  box-shadow: 0 4px 24px 0 rgba(${p => p.theme.colors.dark}, 0.48);
`;

export const Service = styled(Box).attrs({
  m: 2
})`
  color: rgb(${p => p.theme.colors.white});
  font-size: ${p => p.theme.fontSizes.f16};
  line-height: 1.333;
  text-align: center;
  padding: 21px 0;
  border: ${p => p.theme.borderWeights.normal} solid
    rgba(${p => p.theme.colors.white}, 0.04);
  border-radius: ${p => p.theme.radius.default};

  &:nth-child(3) {
    margin-right: 0;
  }
  @media (min-width: ${p => p.theme.breakpoints[0]}) {
    font-size: ${p => p.theme.fontSizes.f24};
    padding: 41px 0;
  }
`;

export const More = styled(Box).attrs({
  mt: 4
})`
  color: rgba(${p => p.theme.colors.white}, 0.4);
  font-size: ${p => p.theme.fontSizes.f16};
  line-height: 1.5;
  text-align: center;
`;
