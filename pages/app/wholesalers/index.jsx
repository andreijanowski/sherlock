import { LoadingIndicator } from "components";
import { Confirm } from "components/modals";
import { preferredAdd } from "actions/partners";
import { keys, noop } from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import { withTranslation } from "i18n";
import requireAuth from "lib/requireAuth";
import { func, string, shape, bool } from "prop-types";
import { connect } from "react-redux";
import AppLayout from "layout/App";
import {
  generateWholesalersMenuItems,
  WHOLESALERS_CATEGORIES,
  WHOLESALERS_URL
} from "sections/integrations/utils";
import IntegrationsList from "sections/integrations";
import { useRouter } from "next/router";
import PartnersSearchBox from "components/PartnersSearchBox";

const namespaces = ["forms", "app"];

const IntegrationsPage = ({
  businessId,
  t,
  lng,
  isLoading,
  wholesalers,
  preferredAddAc
}) => {
  const [confirmOpened, confirmOpen] = useState(false);
  const [partnerIdState, partnerIdSet] = useState("");

  const {
    query: { category },
    push
  } = useRouter();

  useEffect(() => {
    const isCategoryValid =
      !category || WHOLESALERS_CATEGORIES.includes(category);
    if (!isCategoryValid) {
      push(WHOLESALERS_URL);
    }
  }, [category, push]);

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

  return (
    <AppLayout
      t={t}
      lng={lng}
      mainIcon="wholesalers"
      header={t("app:wholesaler")}
      withMenu
      menuItems={generateWholesalersMenuItems(t, category)}
    >
      <PartnersSearchBox isHiddenOnDesktop />
      {wholesalers && wholesalers.size > 0 && (
        <>
          <IntegrationsList
            category={category}
            showActionIcons
            partners={wholesalers}
            t={t}
            onAddToFavorite={handleAddToFavorite}
          />
        </>
      )}
      {isLoading && <LoadingIndicator hasTransparentBackground />}
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
  isLoading: bool,
  preferredAddAc: func,
  wholesalers: shape()
};

IntegrationsPage.defaultProps = {
  businessId: "",
  isLoading: false,
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

        const wholesalers = state.getIn(["partners", "data"]);
        let businessId = "";

        if (businesses) {
          businessId = keys(businesses.toJS())[0] || "";
        }

        return {
          businessId,
          lng: (i18n && i18n.language) || "en",
          isLoading: state.getIn(["partners", "isFetching"]),
          wholesalers
        };
      },
      {
        preferredAddAc: preferredAdd
      }
    )(IntegrationsPage)
  )
);
