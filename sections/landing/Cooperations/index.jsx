import React from "react";
import { Flex, Box } from "@rebass/grid";
import { func } from "prop-types";
import { Button } from "components";
import { LogosContainer, ClientLogo, PartnerLogo, H2Styled } from "./styled";

const clientsNames = ["inglewood", "luigia", "re", "black-tap"];
const partnersNames = [
  "google",
  "stripe",
  "sumup",
  "ikentoo",
  "pi",
  "coople",
  "stuart",
  "socialease",
  "snapshift",
  "forward-fooding",
  "3spos",
  "clyo-systems",
  "leguriviera",
  "kitro",
  "winde-n-dine",
  "boom",
  "backbone"
];

const Cooperations = ({ t }) => (
  <>
    <Box mb={3}>
      <H2Styled>{t("clients")}</H2Styled>
    </Box>
    <LogosContainer>
      {clientsNames.map(name => (
        <ClientLogo name={name} />
      ))}
    </LogosContainer>
    <Flex justifyContent="space-between" alignItems="center" mb={3}>
      <H2Styled>{t("partners")}</H2Styled>
      <Button
        styleName="blue"
        onClick={() => {
          window.open("https://foodetective.typeform.com/to/tzqu8b");
        }}
      >
        {t("becomePartner")}
      </Button>
    </Flex>
    <LogosContainer>
      {partnersNames.map(name => (
        <Flex width={[1 / 2, 1 / 4]} justifyContent="center" p={[1, 3]}>
          <PartnerLogo name={name} />
        </Flex>
      ))}
    </LogosContainer>
  </>
);

Cooperations.propTypes = {
  t: func.isRequired
};

export default Cooperations;
