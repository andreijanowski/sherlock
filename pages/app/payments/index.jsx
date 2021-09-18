import React, { useState, useCallback, useEffect } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { func, string, bool, shape } from "prop-types";

import { defaultLanguage, withTranslation } from "i18n";
import requireAuth from "lib/requireAuth";
import AppLayout from "layout/App";
import { CurrencyGuard, LoadingIndicator, StripeSetupModal } from "components";
import {
  selectCurrentBusinessStripeIsLoading,
  selectCurrentBusinessAttributes
} from "selectors/business";

const namespaces = ["app"];

const PaymentsPage = ({ t, lng, business, isBusinessStripeLoading }) => {
  const isStripeSetUp = business && business.get("stripeUserId");

  const [isStripeSetupModalVisible, setStripeSetupModalVisible] = useState(
    !isStripeSetUp
  );

  const hideStripeSetupModal = useCallback(() => {
    setStripeSetupModalVisible(false);
  }, []);

  useEffect(() => {
    setStripeSetupModalVisible(!isStripeSetUp);
  }, [isStripeSetUp]);

  return (
    <AppLayout
      {...{
        t,
        lng,
        mainIcon: "payments",
        header: t("payments")
      }}
    >
      {isBusinessStripeLoading ? (
        <>
          <LoadingIndicator />
        </>
      ) : (
        <CurrencyGuard>
          {isStripeSetUp && <h3>Payments are set properly</h3>}
          {isStripeSetupModalVisible && (
            <StripeSetupModal onClose={hideStripeSetupModal} />
          )}
        </CurrencyGuard>
      )}
    </AppLayout>
  );
};

PaymentsPage.propTypes = {
  t: func.isRequired,
  lng: string.isRequired,
  isBusinessStripeLoading: bool.isRequired,
  business: shape()
};

PaymentsPage.defaultProps = {
  business: null
};

export default compose(
  requireAuth(true),
  withTranslation(namespaces),
  connect((state, { i18n }) => ({
    lng: (i18n && i18n.language) || defaultLanguage,
    business: selectCurrentBusinessAttributes(state),
    isBusinessStripeLoading: selectCurrentBusinessStripeIsLoading(state)
  }))
)(PaymentsPage);
