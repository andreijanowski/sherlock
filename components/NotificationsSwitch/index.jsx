import React, { useState } from "react";
import { connect } from "react-redux";
import { bool, func, shape, string } from "prop-types";
import Tippy from "@tippyjs/react/headless";
import { Form as FinalForm, FormSpy } from "react-final-form";
import { Box } from "@rebass/grid";
import { diff } from "deep-object-diff";
import _ from "lodash";
import { FormCheckbox, LoadingIndicator } from "components";
import { useT } from "utils/hooks";
import {
  selectBusinessSettingsObject,
  selectCurrentBusinessIsFetching,
  selectCurrentBusinessId
} from "selectors/business";
import { patchBusiness } from "actions/businesses";
import { BUSINESS_SETTINGS_KEYS } from "utils/businessUtils";
import { CheckboxesContainer, Container } from "./styled";
import { Icon } from "../MainApp/styled";
import { BellIcon } from "../Icons/mainControls";

const NotificationsSwitch = ({
  settings,
  currentBusinessId,
  updateBusiness,
  isLoading,
  ...rest
}) => {
  const t = useT("app");
  const [visible, setVisibility] = useState(false);
  const toggleVisibility = () => {
    setVisibility(value => !value);
  };

  if (!settings) return null;

  const initialValues = _.pick(settings, [
    BUSINESS_SETTINGS_KEYS.ORDERS_NOTIFICATIONS,
    BUSINESS_SETTINGS_KEYS.RESERVATIONS_NOTIFICATIONS
  ]);

  const onSubmit = values => {
    const difference = diff(initialValues, values);

    const hasDifference = Object.keys(difference).length > 0;
    if (hasDifference) {
      updateBusiness(
        currentBusinessId,
        // we need to keep settings object with rest attributes
        // because we use setIn in reducer
        {
          settings: {
            ...settings,
            ...values
          }
        },
        true
      );
    }
  };

  const isActive = Object.values(initialValues).some(Boolean);

  const renderContent = attrs => (
    <FinalForm
      onSubmit={onSubmit}
      initialValues={initialValues}
      subscription={{}}
      render={({ handleSubmit }) => (
        <CheckboxesContainer onSubmit={handleSubmit} {...attrs}>
          {isLoading && <LoadingIndicator />}
          <FormSpy
            subscription={{
              values: true
            }}
            onChange={handleSubmit}
          />
          <Box mb={2}>
            <FormCheckbox
              label={t("ordersNotifications")}
              name={BUSINESS_SETTINGS_KEYS.ORDERS_NOTIFICATIONS}
            />
          </Box>
          <FormCheckbox
            label={t("reservationsNotifications")}
            name={BUSINESS_SETTINGS_KEYS.RESERVATIONS_NOTIFICATIONS}
          />
        </CheckboxesContainer>
      )}
    />
  );

  return (
    <Tippy
      interactive
      interactiveBorder={20}
      render={renderContent}
      visible={visible}
      onClickOutside={toggleVisibility}
      placement="bottom"
    >
      <Container {...rest}>
        {isActive && (
          <Icon onClick={toggleVisibility}>
            <BellIcon />
          </Icon>
        )}
      </Container>
    </Tippy>
  );
};

NotificationsSwitch.propTypes = {
  settings: shape({}),
  currentBusinessId: string,
  isLoading: bool.isRequired,
  updateBusiness: func.isRequired
};

NotificationsSwitch.defaultProps = {
  settings: null,
  currentBusinessId: null
};

const mapState = state => ({
  currentBusinessId: selectCurrentBusinessId(state),
  settings: selectBusinessSettingsObject(state),
  isLoading: selectCurrentBusinessIsFetching(state)
});

const mapDispatch = {
  updateBusiness: patchBusiness
};

export default connect(mapState, mapDispatch)(NotificationsSwitch);
