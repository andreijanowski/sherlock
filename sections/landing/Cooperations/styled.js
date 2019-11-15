import styled from "styled-components";
import { Flex } from "@rebass/grid";
import { H2 } from "components";

export const LogosContainer = styled(Flex).attrs(() => ({
  flexWrap: "wrap",
  mb: [3, 5]
}))`
  padding: 8px;
  background: rgb(${p => p.theme.colors.white});
  border: 1px solid rgb(${p => p.theme.colors.lavenderGray});
  border-radius: 10px;
`;

export const ClientLogo = styled.img.attrs(({ name }) => ({
  src: `/static/img/clients/${name}.png`
}))`
  width: auto;
  max-width: 100%;
  max-height: 100px;
  padding: 8px;
  object-fit: contain;
`;

export const PartnerLogo = styled.img.attrs(({ name }) => ({
  src: `/static/img/partners/${name}.png`
}))`
  width: auto;
  max-width: 100%;
  max-height: 60px;
  object-fit: contain;
`;

export const IndustryLogo = styled.img.attrs(({ name }) => ({
  src: `/static/icons/${name}.svg`
}))`
  width: auto;
  max-width: 100%;
  max-height: 60px;
  object-fit: contain;
  @media (min-width: ${p => p.theme.breakpoints[0]}) {
    max-height: 80px;
  }
`;

export const H2Styled = styled(H2)`
  margin: 0;
`;
