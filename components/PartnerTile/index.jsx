import { connect } from "react-redux";
import { shape, arrayOf, oneOfType, func } from "prop-types";

import { connectPartner } from "actions/partners";
import { connectWholesaler } from "actions/wholesalers";

import { OrchestroIntegrationSwitch } from "components";
import IntegrationLink from "./IntegrationLink";
import {
  ButtonContainer,
  Container,
  ContentWrapper,
  Image,
  InfoButton,
  LinkContainer
} from "./styled";

const PartnerTile = ({ partner, t }) => {
  const isOrkestroIntegration = partner.get("name") === "Orkestro";

  return (
    <Container mb={3} width={["100%"]} alignItems="center">
      <Image src={partner.getIn(["logo", "url"])} />
      <ContentWrapper
        alignItems="center"
        justifyContent="space-between"
        p={[3, 4]}
        flex={1}
      >
        <LinkContainer width={["auto", "auto", "35%", "30", "40%"]}>
          <IntegrationLink partner={partner}>
            {partner.get("name")}
          </IntegrationLink>
        </LinkContainer>
        <ButtonContainer width={["100%", "100%", "65%", "70", "60%"]}>
          {isOrkestroIntegration && <OrchestroIntegrationSwitch t={t} />}
          <InfoButton styleName="navyBlue">
            <IntegrationLink partner={partner}>
              {t("app:manageIntegrations.orderNow")}
            </IntegrationLink>
          </InfoButton>
        </ButtonContainer>
      </ContentWrapper>
    </Container>
  );
};

PartnerTile.propTypes = {
  partner: oneOfType([arrayOf(), shape()]).isRequired,
  t: func.isRequired
};

PartnerTile.defaultValue = {
  partner: null
};

export default connect(
  null,
  {
    integratePartner: connectPartner,
    integrateWholesaler: connectWholesaler
  }
)(PartnerTile);
