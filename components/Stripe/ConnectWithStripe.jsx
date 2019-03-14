import React from "react";
import { func } from "prop-types";
import { Container, H2Styled, ParagraphStyled } from "./styled";
import StripeButton from "./StripeButton";

const ConnectWithStripe = ({ t }) => (
  <Container>
    <H2Styled>{t("connectWithStripe")}</H2Styled>
    <ParagraphStyled>{t("connectWithStripeSubheading")}</ParagraphStyled>
    <StripeButton>{t("connectWithStripe")}</StripeButton>
  </Container>
);

ConnectWithStripe.propTypes = {
  t: func.isRequired
};

export default ConnectWithStripe;
