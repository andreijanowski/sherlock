import React from "react";
import { func } from "prop-types";
import { H2 } from "components";
import { Container, ParagraphStyled } from "./styled";
import StripeButton from "./StripeButton";

const ConnectWithStripe = ({ t }) => (
  <Container>
    <H2 textAlign="center">{t("connectWithStripe")}</H2>
    <ParagraphStyled>{t("connectWithStripeSubheading")}</ParagraphStyled>
    <StripeButton>{t("connectWithStripe")}</StripeButton>
  </Container>
);

ConnectWithStripe.propTypes = {
  t: func.isRequired
};

export default ConnectWithStripe;
