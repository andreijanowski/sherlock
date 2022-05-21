import React from "react";
import { func } from "prop-types";

import { FormDropdown } from "components";
import { Field, Form } from "react-final-form";
import { Confirm } from "components/modals";
import { InfoIcon } from "components/Icons";
import { LABEL } from "./utils";
import { DropdownWrapper, InfoLabel } from "./styled";

const DropdownStep = ({ t, confirmSubmit, onClose }) => (
  <Form onSubmit={confirmSubmit}>
    {({ handleSubmit, values }) => (
      <Confirm
        {...{
          btnOkText: t("menu_modal.confirm"),
          btnCancelText: t("menu_modal.cancel"),
          buttonRadius: "20px",
          open: true,
          restyled: true,
          onConfirm: handleSubmit,
          onClose,
          maxwidth: "600px",
          disabled: !values.menuPOS
        }}
      >
        <DropdownWrapper>
          <Field name="menuPOS">
            {({ input, meta }) => (
              <FormDropdown
                {...{
                  input,
                  meta,
                  label: t("menu_modal.choose"),
                  items: [
                    {
                      label: LABEL,
                      value: "menu1"
                    }
                  ]
                }}
              />
            )}
          </Field>
          {!!values.menuPOS && (
            <InfoLabel>
              <InfoIcon />
              {t("menu_modal.warning")}
            </InfoLabel>
          )}
        </DropdownWrapper>
      </Confirm>
    )}
  </Form>
);

DropdownStep.propTypes = {
  t: func.isRequired,
  confirmSubmit: func.isRequired,
  onClose: func.isRequired
};

export default DropdownStep;
