import { func, string, bool } from "prop-types";
import { useState } from "react";
import Switch from "react-switch";
import { Flex } from "@rebass/grid";
import { theme } from "utils/theme";
import { Modal, InputField, Button } from "components";
import { connect } from "react-redux";
import { Form } from "react-final-form";

import { Option, SwitchWrapper, ModalHeader } from "./styled";

const UberIntegrationSwitch = ({
  t,
  isFetching,
  isSucceeded,
  isConnectedToUber
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);
  return (
    <Flex alignItems="center" mx={3}>
      {isOpen && (
        <Modal {...{ open: true, onClose: closeModal }}>
          <ModalHeader>Uber Eats Integration</ModalHeader>
          <Form
            onSubmit={() => {}}
            render={() => (
              <form>
                <InputField name="id" placeholder="id" type="text" />
                <InputField name="secret" placeholder="secret" type="text" />
                <InputField name="other" placeholder="other" type="text" />
                <Button>Submit</Button>
              </form>
            )}
          />
        </Modal>
      )}
      <Option dark={isConnectedToUber} mr={3}>
        {isConnectedToUber
          ? t("integrations:disconnect")
          : t("integrations:disconnected")}
      </Option>
      <SwitchWrapper>
        <Switch
          disabled={isFetching || !isSucceeded}
          checked={isConnectedToUber}
          onChange={() => setIsOpen(true)}
          uncheckedIcon={false}
          checkedIcon={false}
          handleDiameter={21}
          height={31}
          width={80}
          offHandleColor="#a5a8af"
          onHandleColor="#000000"
          offColor="#f8f9ff"
          onColor="#f8f9ff"
          boxShadow={`0 1px 3px rgba(${theme.colors.blue}, 0.48)`}
          activeBoxShadow={`0 0 0 3px rgba(${theme.colors.blue}, 0.48)`}
        />
      </SwitchWrapper>
      <Option dark={!isConnectedToUber} ml={3}>
        {isConnectedToUber
          ? t("integrations:connected")
          : t("integrations:connect")}
      </Option>
    </Flex>
  );
};
UberIntegrationSwitch.propTypes = {
  businessId: string.isRequired,
  isConnectedToUber: bool.isRequired,
  isFetching: bool.isRequired,
  isSucceeded: bool.isRequired,
  t: func.isRequired
};

UberIntegrationSwitch.defaultValue = {
  businessId: string,
  isUberConnected: false,
  isFetching: false,
  isSucceeded: true
};

export default connect(state => {
  const buissnes = state.getIn([
    "users",
    "currentBusiness",
    "data",
    "businesses"
  ]);
  const isConnected = state.getIn(["integrations", "isConnectedToOrkestro"]);
  const isUberConnected = state.getIn(["integrations", "isConnectedToUber"]);
  const fetching = state.getIn(["integrations", "isFetching"]);
  const success = state.getIn(["integrations", "isSucceeded"]);
  const id = buissnes && buissnes.first().get("id");
  return {
    businessId: id,
    isConnectedToOrkestro: isConnected,
    isConnectedToUber: isUberConnected,
    isFetching: fetching,
    isSucceeded: success
  };
})(UberIntegrationSwitch);
