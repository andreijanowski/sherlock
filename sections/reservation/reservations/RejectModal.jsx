import {
  Modal,
  FormDropdown,
  FormTextarea,
  Button,
  ModalHeader
} from "components";
import { Form as FinalForm, Field } from "react-final-form";
import arrayMutators from "final-form-arrays";
import { RejectModalIcon } from "icons";
import { func, bool } from "prop-types";
import { Flex, Box } from "@rebass/grid";

const RejectModal = ({ isOpen, onClose, t, handleRejectionSubmit }) =>
  isOpen ? (
    <Modal {...{ open: true, onClose }}>
      <FinalForm
        initialValues={{
          rejectReason: "restaurant_full"
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
                  { label: t("restaurant_full"), value: "restaurant_full" },
                  {
                    label: t("almost_closing_time"),
                    value: "almost_closing_time"
                  },
                  { label: t("other"), value: "other" }
                ]}
              />
            </Box>
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

RejectModal.propTypes = {
  isOpen: bool.isRequired,
  onClose: func.isRequired,
  handleRejectionSubmit: func.isRequired,
  t: func.isRequired
};

export default RejectModal;
