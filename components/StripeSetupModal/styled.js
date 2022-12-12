import styled from "styled-components";
import { StyledButton, Paragraph } from "components";

export const ParagraphStyled = styled(Paragraph)`
  text-align: center;
`;

export const StripeLogo = styled.div`
  width: 20px;
  height: 22px;
  background-image: url("/static/img/StripeSLogo.png");
`;

export const StripeButtonStyled = styled(StyledButton)`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 40px;
  padding: 0 40px 0 20px;
  margin: auto;
  color: white;
  font-weight: ${p => p.theme.fontWeights.regular};
  background-color: rgb(${p => p.theme.colors.blue});
  border: none;
  > span {
    padding-left: 10px;
    text-align: center;
  }
`;
