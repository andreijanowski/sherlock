import {
  Modal,
  FormDropdown,
  FormCheckbox,
  FormTextarea,
  Button
} from "components";
import { Form as FinalForm, Field } from "react-final-form";
import { FieldArray } from "react-final-form-arrays";
import { RejectModalIcon } from "icons";
import { shape, func, bool } from "prop-types";
import { Flex, Box } from "@rebass/grid";
import { ModalHeader, ElementsWrapper } from "./styled";

const RejectModal = ({ open, onClose, t }) => (
  <Modal {...{ open, onClose }}>
    <FinalForm
      initialValues={{
        unavailableElements: [false, false, false, false, false]
      }}
      onSubmit={() => null}
      render={() => (
        <Flex as="form" flexDirection="column" alignItems="center">
          <RejectModalIcon />
          <ModalHeader>{t("rejectReasonHeader")}</ModalHeader>
          <Box width={1}>
            <Field
              name="rejectReason"
              component={FormDropdown}
              label={t("rejectReasonLabel")}
              items={[
                { label: t("rejectReasonOther"), value: "other" },
                {
                  label: t("rejectReasonDishesUnavailable"),
                  value: "dishes_unavailable"
                },
                { label: t("rejectReasonKitchenFull"), value: "kitchen_full" },
                {
                  label: t("rejectReasonNoDeliveryPerson"),
                  value: "no_delivery_person"
                },
                {
                  label: t("rejectReasonAlmostClosingTime"),
                  value: "almost_closing_time"
                }
              ]}
            />
          </Box>
          <ElementsWrapper width={1} p={3} mb={3}>
            <FieldArray name="unavailableElements">
              {({ fields }) =>
                fields.map((name, index) => (
                  <FormCheckbox name={name} label={`Element ${index}`} />
                ))
              }
            </FieldArray>
          </ElementsWrapper>
          <FormTextarea
            name="otherRejectionReason"
            label={t("otherRejectionReasonLabel")}
            placeholder={t("otherRejectionReasonPlaceholder")}
          />
          <Box width={1}>
            <Flex mx={-2}>
              <Box width={1 / 2} px={2}>
                <Button
                  styleName="blue"
                  type="button"
                  onClick={onClose}
                  width="100%"
                >
                  {t("cancel")}
                </Button>
              </Box>
              <Box width={1 / 2} px={2}>
                <Button styleName="blue" type="submit" width="100%">
                  {t("confirm")}
                </Button>
              </Box>
            </Flex>
          </Box>
        </Flex>
      )}
    />
  </Modal>
);

RejectModal.propTypes = {
  event: shape().isRequired,
  open: bool.isRequired,
  onClose: func.isRequired,
  t: func.isRequired
};

export default RejectModal;
