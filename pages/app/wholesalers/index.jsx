import { LoadingIndicator } from "components";
import { Confirm } from "components/modals";
import { fetchPreferredPartners, preferredAdd } from "actions/partners";
import { keys, noop } from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import Router from "next/router";
import { withTranslation } from "i18n";
import requireAuth from "lib/requireAuth";
import { arrayOf, func, string, shape, bool } from "prop-types";
import { connect } from "react-redux";
import AppLayout from "layout/App";
import {
  generateWholesalersMenuItems,
  WHOLESALERS_CATEGORIES
} from "sections/integrations/utils";
import isServer from "utils/isServer";
import IntegrationsList from "sections/integrations";

const namespaces = ["forms", "app"];

const IntegrationsPage = ({
  businessId,
  t,
  lng,
  partnersPreferredIds,
  pending,
  wholesalers,
  fetchPreferredPartnersAc,
  preferredAddAc
}) => {
  const [confirmOpened, confirmOpen] = useState(false);
  const [partnerIdState, partnerIdSet] = useState("");
  const [tab, setTab] = useState("");
  const setActiveTab = () => {
    if (!isServer) {
      const urlParams = new URLSearchParams(window.location.search);
      const getParam = urlParams.get("category");

      setTab(WHOLESALERS_CATEGORIES.includes(getParam) ? getParam : "pos");
    }
  };

  useEffect(() => {
    if (!businessId) {
      return;
    }

    fetchPreferredPartnersAc({
      filter: "wholesaler",
      id: businessId
    });
  }, [businessId, fetchPreferredPartnersAc]);

  useEffect(() => {
    setActiveTab();
  }, []);

  Router.events.on("routeChangeComplete", setActiveTab);

  const handleAddToFavorite = useCallback(
    (data = {}) => {
      const { added, partnerId } = data;

      if (added) {
        confirmOpen(true);
        partnerIdSet(partnerId);
      } else {
        preferredAddAc({
          businessId,
          isDelete: false,
          partnerId
        });
      }
    },
    [businessId, preferredAddAc]
  );

  const handleConfirmClose = useCallback(() => {
    confirmOpen(false);
  }, [confirmOpen]);

  const handleConfirm = useCallback(() => {
    preferredAddAc({
      businessId,
      isDelete: true,
      partnerId: partnerIdState
    });
    handleConfirmClose();
    partnerIdSet("");
  }, [businessId, handleConfirmClose, partnerIdState, preferredAddAc]);

  const preparedWholesalers =
    wholesalers &&
    wholesalers.filter(wholesaler => {
      switch (tab) {
        case "allProducts":
          return wholesaler.getIn(["attributes", "category"]) === "wholesaler";

        case "preferred": {
          const wId = wholesaler.get("id");

          return partnersPreferredIds.includes(wId);
        }

        default:
          return wholesaler.getIn(["attributes", "wholesalerCategory"]) === tab;
      }
    });

  return (
    <AppLayout
      t={t}
      lng={lng}
      mainIcon="wholesalers"
      header={t("app:wholesaler")}
      withMenu
      menuItems={generateWholesalersMenuItems(t, tab)}
    >
      {wholesalers && wholesalers.size > 0 && (
        <>
          {pending && <LoadingIndicator hasTransparentBackground />}
          <IntegrationsList
            itemsAdded={partnersPreferredIds}
            showActionIcons
            partners={preparedWholesalers}
            t={t}
            onAddToFavorite={handleAddToFavorite}
          />
        </>
      )}
      <Confirm
        contentCenter
        withIcon
        btnOkText="Confirm"
        open={confirmOpened}
        onClose={handleConfirmClose}
        onConfirm={handleConfirm}
      >
        Do you really want to remove this partner from preferred?
      </Confirm>
    </AppLayout>
  );
};

IntegrationsPage.getInitialProps = async () => ({
  namespacesRequired: namespaces
});

IntegrationsPage.propTypes = {
  businessId: string,
  t: func.isRequired,
  lng: string.isRequired,
  fetchPreferredPartnersAc: func,
  partnersPreferredIds: arrayOf(string),
  pending: bool,
  preferredAddAc: func,
  wholesalers: shape()
};

IntegrationsPage.defaultProps = {
  businessId: "",
  fetchPreferredPartnersAc: noop,
  partnersPreferredIds: [],
  pending: false,
  preferredAddAc: noop,
  wholesalers: null
};

export default requireAuth(true)(
  withTranslation(namespaces)(
    connect(
      (state, { i18n }) => {
        const businesses = state.getIn([
          "users",
          "currentBusiness",
          "data",
          "businesses"
        ]);
        const partnersPreferredIds = state
          .getIn(["partnersPreferred", "items"])
          .map(({ id }) => id)
          .toJS();
        const wholesalers = state.getIn([
          "wholesalers",
          "data",
          "wholesalers",
          "partners"
        ]);
        let businessId = "";

        if (businesses) {
          businessId = keys(businesses.toJS())[0] || "";
        }

        return {
          businessId,
          lng: (i18n && i18n.language) || "en",
          partnersPreferredIds,
          pending: state.getIn(["partnersPreferred", "pending"]),
          wholesalers
        };
      },
      {
        fetchPreferredPartnersAc: fetchPreferredPartners,
        preferredAddAc: preferredAdd
      }
    )(IntegrationsPage)
  )
);
