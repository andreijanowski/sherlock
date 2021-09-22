import React, { useEffect } from "react";
import { oneOfType, arrayOf, shape, string, func, bool } from "prop-types";
import { noop } from "lodash";
import { connect } from "react-redux";

import { WHOLESALERS_CATEGORY } from "consts";
import { fetchPartners } from "actions/partners";
import PartnerTile from "components/PartnerTile";
import { Wrapper, NoPartners } from "./styled";

const SCROLL_GAP = 100;

const IntegrationsList = ({
  category,
  partners,
  showActionIcons,
  t,
  onAddToFavorite,
  hasMore,
  previousConfig,
  fetchPartnersHandler,
  isLoading
}) => {
  const isPreferred = category === WHOLESALERS_CATEGORY.PREFERRED;

  useEffect(() => {
    const onScroll = () => {
      const pageHeight = document.body.clientHeight;
      const scrolledHeight = window.scrollY + window.innerHeight;
      const isFetchAvailable = !isLoading && hasMore && previousConfig;
      const isScrolledToBottom = scrolledHeight + SCROLL_GAP > pageHeight;
      const shouldFetch = isFetchAvailable && isScrolledToBottom;
      if (shouldFetch) {
        fetchPartnersHandler({
          ...previousConfig,
          merge: true,
          page: previousConfig.page + 1,
          search: "active"
        });
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [isLoading, previousConfig, hasMore, fetchPartnersHandler]);

  return (
    <Wrapper>
      {partners.size > 0 ? (
        partners.map(partner => {
          const partnerId = partner.get("id");
          const isActive = partner.getIn(["attributes", "active"]);
          return (
            isActive && (
              <PartnerTile
                showActionIcon={showActionIcons}
                key={partnerId}
                partner={partner.get("attributes")}
                partnerId={partnerId}
                t={t}
                onAddClick={onAddToFavorite}
              />
            )
          );
        })
      ) : (
        <NoPartners width="100%" alignItems="center" justifyContent="center">
          {t(
            `app:manageIntegrations.${
              isPreferred ? "noPreferred" : "noPartners"
            }`
          )}
        </NoPartners>
      )}
    </Wrapper>
  );
};

IntegrationsList.defaultProps = {
  category: "",
  showActionIcons: false,
  onAddToFavorite: noop,
  hasMore: false,
  previousConfig: null
};

IntegrationsList.propTypes = {
  category: string,
  partners: oneOfType([shape(), arrayOf()]).isRequired,
  showActionIcons: bool,
  t: func.isRequired,
  onAddToFavorite: func,
  fetchPartnersHandler: func.isRequired,
  hasMore: bool,
  isLoading: bool.isRequired,
  previousConfig: shape()
};

const mapState = state => ({
  isLoading: state.getIn(["partners", "isFetching"]),
  hasMore: state.getIn(["partners", "hasMore"]),
  previousConfig: state.getIn(["partners", "previousConfig"])
});

const mapDispatch = {
  fetchPartnersHandler: fetchPartners
};

export default connect(
  mapState,
  mapDispatch
)(IntegrationsList);
