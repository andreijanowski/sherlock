import { Form as FinalForm, Field } from "react-final-form";
import { FieldArray } from "react-final-form-arrays";
import arrayMutators from "final-form-arrays";
import { shape, func, bool } from "prop-types";
import { Flex, Box } from "@rebass/grid";

import { useTranslation } from "i18n";
import {
  Modal,
  FormDropdown,
  FormCheckbox,
  FormTextarea,
  Button,
  ModalHeader
} from "components";
import { RejectModalIcon } from "icons";
import { ElementsWrapper } from "./styled";

const RejectModal = ({
  isOpen,
  onClose,
  pendingRejectionOrder,
  handleRejectionSubmit
}) => {
  const { t } = useTranslation("lefood");
  return isOpen ? (
    <Modal {...{ open: true, onClose }}>
      <FinalForm
        initialValues={{
          unavailableElements: pendingRejectionOrder
            ? pendingRejectionOrder
                .getIn(["relationships", "elements", "data"])
                .map(() => false)
                .toList()
                .toArray()
            : [],
          rejectReason: "kitchen_full"
        }}
        mutators={{ ...{ ...arrayMutators } }}
        onSubmit={handleRejectionSubmit}
        subscription={{
          handleSubmit: true,
          values: true
        }}
        render={({ handleSubmit, values }) => (
          <Flex
            onSubmit={handleSubmit}
            as="form"
            flexDirection="column"
            alignItems="center"
            width={320}
          >
            <RejectModalIcon />
            <ModalHeader>{t("rejectReasonHeader")}</ModalHeader>
            <Box width={1}>
              <Field
                name="rejectReason"
                component={FormDropdown}
                label={t("rejectReasonLabel")}
                items={[
                  { label: t("kitchen_full"), value: "kitchen_full" },
                  {
                    label: t("no_delivery_person"),
                    value: "no_delivery_person"
                  },
                  {
                    label: t("almost_closing_time"),
                    value: "almost_closing_time"
                  },
                  {
                    label: t("dishes_unavailable"),
                    value: "dishes_unavailable"
                  },
                  { label: t("other"), value: "other" }
                ]}
              />
            </Box>
            {values.rejectReason === "dishes_unavailable" &&
              pendingRejectionOrder && (
                <ElementsWrapper width={1} p={3} mb={3} pb={0}>
                  <FieldArray name="unavailableElements">
                    {({ fields }) =>
                      fields.map((name, index) => (
                        <FormCheckbox
                          name={name}
                          label={pendingRejectionOrder.getIn([
                            "relationships",
                            "elements",
                            "data",
                            index,
                            "attributes",
                            "dishName"
                          ])}
                          key={name}
                        />
                      ))
                    }
                  </FieldArray>
                </ElementsWrapper>
              )}
            {values.rejectReason === "other" && (
              <FormTextarea
                name="otherRejectionReason"
                label={t("otherRejectionReasonLabel")}
                placeholder={t("otherRejectionReasonPlaceholder")}
              />
            )}
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
  ) : null;
};

RejectModal.propTypes = {
  pendingRejectionOrder: shape(),
  isOpen: bool,
  onClose: func.isRequired,
  handleRejectionSubmit: func.isRequired
};

RejectModal.defaultProps = {
  pendingRejectionOrder: undefined,
  isOpen: false
};

export default RejectModal;
