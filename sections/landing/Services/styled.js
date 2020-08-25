import styled, { css } from "styled-components";
import { Flex, Box } from "@rebass/grid";

export const alignCenterMobile = css`
  text-align: center;
  @media (min-width: ${p => p.theme.breakpoints[0]}) {
    text-align: start;
  }
`;

export const ServicesWrapper = styled(Flex).attrs(() => ({
  flexDirection: "column",

  width: 1
}))`
  position: relative;
  z-index: 1;
  justify-content: center;
  max-width: 1150px;
  margin: auto;
  @media (min-width: ${p => p.theme.breakpoints[0]}) {
    margin-bottom: 80px;
  }
`;

export const Service = styled(Flex).attrs(() => ({
  flexDirection: "column",
  alignItems: "center"
}))`
  height: 100%;
  padding: 10px 0;
  color: rgb(${p => p.theme.colors.white});
  font-size: ${p => p.theme.fontSizes.f16};
  line-height: 1.333;
  text-align: center;

  &:nth-child(3) {
    margin-right: 0;
  }
  @media (min-width: ${p => p.theme.breakpoints[0]}) {
    padding: 20px 0;
    font-size: ${p => p.theme.fontSizes.f18};
  }
`;

export const More = styled(Box).attrs(() => ({
  mt: 4
}))`
  color: rgba(${p => p.theme.colors.white}, 0.4);
  font-size: ${p => p.theme.fontSizes.f16};
  line-height: 1.5;
  text-align: center;
`;

export const ServiceIcon = styled.img.attrs(({ name }) => ({
  src: `/static/icons/${name}.svg`
}))`
  max-width: 95px;
  max-height: 95px;
  margin-bottom: 4px;
`;
