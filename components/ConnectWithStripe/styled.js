import styled from "styled-components";
import { Button, Paragraph } from "components";
import { Flex } from "@rebass/grid";

export const Container = styled(Flex).attrs(() => ({
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  p: [3, 4],
  width: 1
}))`
  height: 100%;
`;

export const ParagraphStyled = styled(Paragraph)`
  text-align: center;
`;

export const StripeLogo = styled.div`
  width: 20px;
  height: 22px;
  background-image: url("/static/img/StripeSLogo.png");
`;

export const StripeButtonStyled = styled(Button)`
  display: flex;
  align-items: center;
  min-width: 225px;
  height: 40px;
  padding: 0 40px 0 20px;
  color: white;
  font-weight: ${p => p.theme.fontWeights.regular};
  background-color: rgb(${p => p.theme.colors.blue});
  border: none;
  > span {
    padding-left: 10px;
  }
`;
