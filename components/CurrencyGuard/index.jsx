import React, { useState, useCallback } from "react";
import { func, string, shape, node, arrayOf, oneOf, bool } from "prop-types";
import { withTranslation } from "i18n";
import { Box, Flex } from "@rebass/grid";
import { connect } from "react-redux";
import { compose } from "redux";

import { StyledButton, H2 } from "components";
import { patchBusiness } from "actions/businesses";
import { setCurrentBusiness } from "actions/app";
import StripeCurrencyModal from "components/StripeSetupModal/StripeCurrencyModal";
import {
  selectCurrentBusinessAttributes,
  selectCurrentBusinessId,
  selectCurrentBusinessIsFetching
} from "selectors/business";

const namespaces = ["lefood"];

const CurrencyGuard = ({
  t,
  business,
  children,
  updateBusiness,
  businessId,
  changeCurrentBusiness,
  isFetching
}) => {
  const [showCurrencyModal, setShowCurrencyModal] = useState(
    business && !business.get("stripeCurrency")
  );

  const onStripeCurrencyUpdate = useCallback(
    async ({ stripeCurrency: { value: stripeCurrency } }) => {
      await updateBusiness(
        businessId,
        {
          stripeCurrency
        },
        true
      );
      await changeCurrentBusiness(businessId);
      setShowCurrencyModal(false);
    },
    [changeCurrentBusiness, businessId, updateBusiness]
  );

  const onShowStripeCurrencyModal = useCallback(() => {
    setShowCurrencyModal(true);
  }, []);

  const onHideStripeCurrencyModal = useCallback(() => {
    setShowCurrencyModal(false);
  }, []);

  return (
    <>
      {business.get("stripeCurrency") ? (
        children
      ) : (
        <Flex
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          pt={6}
        >
          <H2 textAlign="center">{t("stripeCurrencyNotSet")}</H2>
          <Box>
            <StyledButton onClick={onShowStripeCurrencyModal}>
              {t("setStripeCurrency")}
            </StyledButton>
          </Box>
        </Flex>
      )}
      {showCurrencyModal && (
        <StripeCurrencyModal
          {...{
            isOpen: true,
            stripeCurrency: business.get("stripeCurrency"),
            setStripeCurrency: onStripeCurrencyUpdate,
            onClose: onHideStripeCurrencyModal,
            isFetching,
            t
          }}
        />
      )}
    </>
  );
};

CurrencyGuard.propTypes = {
  t: func.isRequired,
  business: shape().isRequired,
  children: oneOf([arrayOf(node), node]).isRequired,
  updateBusiness: func.isRequired,
  businessId: string.isRequired,
  changeCurrentBusiness: func.isRequired,
  isFetching: bool
};

CurrencyGuard.defaultProps = {
  isFetching: false
};

export default compose(
  withTranslation(namespaces),
  connect(
    state => ({
      business: selectCurrentBusinessAttributes(state),
      businessId: selectCurrentBusinessId(state),
      isFetching: selectCurrentBusinessIsFetching(state)
    }),
    {
      updateBusiness: patchBusiness,
      changeCurrentBusiness: setCurrentBusiness
    }
  )
)(CurrencyGuard);
