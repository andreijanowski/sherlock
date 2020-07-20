import React from "react";
import { oneOfType, arrayOf, shape, func } from "prop-types";

import PartnerTile from "components/PartnerTile";
import { Wrapper, NoPartners } from "./styled";

const IntegrationsList = ({ partners, t }) => (
  <Wrapper>
    {partners.size > 0 ? (
      partners
        .valueSeq()
        .map(partner => (
          <PartnerTile
            key={partner.get("id")}
            partner={partner.get("attributes")}
            partnerId={partner.get("id")}
            partnerRelationships={partner
              .getIn(["relationships", "users", "data"])
              .toJS()}
            t={t}
          />
        ))
    ) : (
      <NoPartners width="100%" alignItems="center" justifyContent="center">
        {t("app:manageIntegrations.noPartners")}
      </NoPartners>
    )}
  </Wrapper>
);

IntegrationsList.propTypes = {
  partners: oneOfType([shape(), arrayOf()]).isRequired,
  t: func.isRequired
};

export default IntegrationsList;
