import { noop } from "lodash";
import React from "react";
import { oneOfType, arrayOf, shape, string, func, bool } from "prop-types";
import PartnerTile from "components/PartnerTile";
import { Wrapper, NoPartners } from "./styled";

const IntegrationsList = ({
  itemsAdded,
  partners,
  showActionIcons,
  t,
  onAddToFavorite
}) => (
  <Wrapper>
    {partners.size > 0 ? (
      partners.valueSeq().map(partner => {
        const partnerId = partner.get("id");

        return (
          <PartnerTile
            added={itemsAdded.includes(partnerId)}
            showActionIcon={showActionIcons}
            key={partnerId}
            partner={partner.get("attributes")}
            partnerId={partnerId}
            partnerRelationships={partner
              .getIn(["relationships", "users", "data"])
              .toJS()}
            t={t}
            onAddClick={onAddToFavorite}
          />
        );
      })
    ) : (
      <NoPartners width="100%" alignItems="center" justifyContent="center">
        {t("app:manageIntegrations.noPartners")}
      </NoPartners>
    )}
  </Wrapper>
);

IntegrationsList.defaultProps = {
  itemsAdded: [],
  showActionIcons: false,
  onAddToFavorite: noop
};
IntegrationsList.propTypes = {
  itemsAdded: arrayOf(string),
  partners: oneOfType([shape(), arrayOf()]).isRequired,
  showActionIcons: bool,
  t: func.isRequired,
  onAddToFavorite: func
};

export default IntegrationsList;
