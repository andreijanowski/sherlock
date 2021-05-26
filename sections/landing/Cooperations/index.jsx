import React from "react";
import { Flex, Box } from "@rebass/grid";
import { func, oneOfType, any, shape } from "prop-types";

import { Button } from "components";
import { becomePartnerLink } from "consts";
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
  "roadrunner",
  "le5emejour"
];
const partnersNames = [
  "square-pos",
  "ikentoo",
  "sumup",
  "pi",
  "3spos",
  "clyo-systems",
  "google",
  "stripe",
  "uber-eats",
  "stuart",
  "orkestro",
  "bexio",
  "coople",
  "snapshift",
  "socialease",
  "batmaid",
  "brigad",
  "winde-n-dine",
  "leguriviera",
  "kitro",
  "boom",
  "forward-fooding",
  "options",
  "backbone"
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
        <Flex
          key={name}
          width={[1 / 2, 1 / 7]}
          justifyContent="center"
          p={[1, 3]}
        >
          <ClientLogo name={name} />
        </Flex>
      ))}
    </LogosContainer>
    <Flex justifyContent="space-between" alignItems="center" mb={3}>
      <H2Styled>{t("cooperations.partners")}</H2Styled>
      <Button
        styleName="blue"
        onClick={() => {
          window.open(becomePartnerLink);
        }}
      >
        {t("cooperations.becomePartner")}
      </Button>
    </Flex>
    <LogosContainer>
      {partnersNames.map(name => (
        <Flex
          key={name}
          width={[1 / 2, 1 / 4, 1 / 6]}
          justifyContent="center"
          p={[2, 3]}
        >
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
          key={name}
          width={[1 / 2, 1 / 4, 1 / 6]}
          justifyContent="space-between"
          alignItems="center"
          flexDirection="column"
          p={[1, 2]}
        >
          <p
            style={{
              textAlign: "center"
            }}
          >
            {t(`cooperations.industries.names.${name}`)}
          </p>
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
