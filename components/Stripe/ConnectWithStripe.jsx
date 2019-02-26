import React from "react";
import { Paragraph } from "components";
import { func } from "prop-types";
import { Container, H2Styled } from "./styled";
import StripeButton from "./StripeButton";

const ConnectWithStripe = ({ t }) => (
  <Container>
    <H2Styled>{t("connectWithStripe")}</H2Styled>
    <Paragraph>{t("connectWithStripeSubheading")}</Paragraph>
    <StripeButton>{t("connectWithStripe")}</StripeButton>
  </Container>
);

ConnectWithStripe.propTypes = {
  t: func.isRequired
};

export default ConnectWithStripe;
