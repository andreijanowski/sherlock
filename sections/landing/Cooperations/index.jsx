import React from "react";
import { Flex, Box } from "@rebass/grid";
import { func, oneOfType, any, shape } from "prop-types";
import { Button } from "components";
import {
  LogosContainer,
  ClientLogo,
  PartnerLogo,
  IndustryLogo,
  H2Styled
} from "./styled";

const clientsNames = [
  "inglewood",
  "cipollino",
  "re",
  "zaza",
  "max",
  "roadrunner"
];
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
  "backbone",
  "uber-eats"
];
const industriesNames = [
  "restaurants",
  "hotel",
  "coffee-shops",
  "food-trucks",
  "salad-bar",
  "ice-cream-shop",
  "caterings",
  "brewery",
  "street-food",
  "fromagerie",
  "butcher",
  "bars"
];

const Cooperations = ({ t, industriesRef }) => (
  <>
    <Box mb={3}>
      <H2Styled>{t("cooperations.clients")}</H2Styled>
    </Box>
    <LogosContainer>
      {clientsNames.map(name => (
        <Flex width={[1 / 2, 1 / 6]} justifyContent="center" p={[1, 3]}>
          <ClientLogo name={name} />
        </Flex>
      ))}
    </LogosContainer>
    <Flex justifyContent="space-between" alignItems="center" mb={3}>
      <H2Styled>{t("cooperations.partners")}</H2Styled>
      <Button
        styleName="blue"
        onClick={() => {
          window.open("https://foodetective.typeform.com/to/tzqu8b");
        }}
      >
        {t("cooperations.becomePartner")}
      </Button>
    </Flex>
    <LogosContainer>
      {partnersNames.map(name => (
        <Flex width={[1 / 2, 1 / 4, 1 / 6]} justifyContent="center" p={[2, 3]}>
          <PartnerLogo name={name} />
        </Flex>
      ))}
    </LogosContainer>
    <Box mb={3} ref={industriesRef}>
      <H2Styled>{t("cooperations.industries.header")}</H2Styled>
    </Box>
    <LogosContainer>
      {industriesNames.map(name => (
        <Flex
          width={[1 / 2, 1 / 4, 1 / 6]}
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          p={2}
        >
          <p>{t(`cooperations.industries.names.${name}`)}</p>
          <IndustryLogo name={name} />
        </Flex>
      ))}
    </LogosContainer>
  </>
);

Cooperations.propTypes = {
  t: func.isRequired,
  industriesRef: oneOfType([func, shape({ current: any })]).isRequired
};

export default Cooperations;
