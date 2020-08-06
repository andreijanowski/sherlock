import styled, { css } from "styled-components";
import { Flex, Box } from "@rebass/grid";
import { H2 } from "components";

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
  /* background: rgb(${p => p.theme.colors.dark});
  border-radius: ${p => p.theme.radius.double};
  box-shadow: 0 4px 24px 0 rgba(${p => p.theme.colors.dark}, 0.48);

  @media (min-width: ${p => p.theme.breakpoints[0]}) {
    margin-bottom: 80px;
  } */
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
  /* border: ${p => p.theme.borderWeights.normal} solid
    rgba(${p => p.theme.colors.white}, 0.04);
  border-radius: ${p => p.theme.radius.default}; */

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

export const BlueText = styled.span`
  color: rgb(${p => p.theme.colors.blue});
  white-space: nowrap;
`;
export const WhiteText = styled.span`
  color: rgb(${p => p.theme.colors.blue});
`;

export const H2Styled = styled(H2)`
  ${alignCenterMobile}
  color: rgb(${p => p.theme.colors.white});
  font-weight: ${p => p.theme.fontWeights.semiBold};
  font-size: ${p => p.theme.fontSizes.f30};
  letter-spacing: 0.6px;
`;

export const ParagraphStyled = styled("p")`
  ${alignCenterMobile}
  margin: 0;
  color: rgb(${p => p.theme.colors.white});
  font-weight: ${p => p.theme.fontWeights.semiBold};
  font-size: ${p => p.theme.fontSizes.f16};
  line-height: 24px;
  letter-spacing: 1.2px;
  @media (min-width: ${p => p.theme.breakpoints[0]}) {
    font-size: ${p => p.theme.fontSizes.f30};
    line-height: 40px;
  }
`;
