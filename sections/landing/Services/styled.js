import styled from "styled-components";
import { Flex, Box } from "@rebass/grid";

export const MainWrapper = styled.div`
  width: 100%;
  max-width: 960px;
  margin-bottom: 80px;
  position: relative;
`;

export const ServicesWrapper = styled(Flex).attrs({
  p: 4,
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
  font-size: ${p => p.theme.fontSizes.f24};
  line-height: 1.333;
  text-align: center;
  padding: 41px 0;
  border: ${p => p.theme.borderWeights.normal} solid
    rgba(${p => p.theme.colors.white}, 0.04);
  border-radius: ${p => p.theme.radius.default};

  &:nth-child(3) {
    margin-right: 0;
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
