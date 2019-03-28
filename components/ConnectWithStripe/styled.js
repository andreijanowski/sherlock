import styled from "styled-components";
import { H2, Button, Paragraph } from "components";
import { Flex } from "@rebass/grid";

export const Container = styled(Flex).attrs({
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  p: [3, 4],
  width: 1
})`
  height: 100%;
`;

export const H2Styled = styled(H2)`
  text-align: center;
`;

export const ParagraphStyled = styled(Paragraph)`
  text-align: center;
`;

export const StripeLogo = styled.div`
  background-image: url("/static/img/StripeSLogo.png");
  width: 20px;
  height: 22px;
`;

export const StripeButtonStyled = styled(Button)`
  display: flex;
  font-weight: ${p => p.theme.fontWeights.regular};
  height: 40px;
  min-width: 225px;
  background-color: rgb(${p => p.theme.colors.blue});
  padding: 0 40px 0 20px;
  color: white;
  border: none;
  align-items: center;
  > span {
    padding-left: 10px;
  }
`;
