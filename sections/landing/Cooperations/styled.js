import styled, { css } from "styled-components";
import { Flex } from "@rebass/grid";
import { H2 } from "components";

export const LogosContainer = styled(Flex).attrs(() => ({
  flexWrap: "wrap",
  alignItems: "stretch",
  mb: [3, 5]
}))`
  padding: 8px;
  background: rgb(${p => p.theme.colors.white});
  border: 1px solid rgb(${p => p.theme.colors.lavenderGray});
  border-radius: 10px;
`;

const logoMixin = css`
  width: auto;
  max-width: 100%;
  object-fit: contain;
`;

export const ClientLogo = styled.img.attrs(({ name }) => ({
  src: `/static/img/clients/${name}.png`
}))`
  ${logoMixin}
  max-height: 60px;
`;

export const PartnerLogo = styled.img.attrs(({ name }) => ({
  src: `/static/img/partners/${name}.png`
}))`
  ${logoMixin}
  max-height: 40px;
`;

export const IndustryLogo = styled.img.attrs(({ name }) => ({
  src: `/static/icons/${name}.svg`
}))`
  ${logoMixin}
  max-height: 60px;
`;

export const H2Styled = styled(H2)`
  margin: 0;
`;
