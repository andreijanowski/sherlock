import { Modal, Button, FormSelect, Paragraph, H3 } from "components/index";
import { func, bool, string } from "prop-types";
import { Flex, Box } from "@rebass/grid";
import currencies from "utils/currencies";
import { WarningIcon } from "icons";
import { Form as FinalForm, Field } from "react-final-form";

const StripeCurrencyModal = ({
  onClose,
  t,
  setStripeCurrency,
  stripeCurrency
}) => (
  <Modal {...{ open: true, onClose }}>
    <FinalForm
      initialValues={{
        stripeCurrency: currencies.find(c => c.value === stripeCurrency) || {}
      }}
      onSubmit={setStripeCurrency}
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
          width={[1, 510]}
        >
          <WarningIcon />
          <H3 mt={4}>{t("setStripeCurrencyHeader")}</H3>
          <Paragraph>{t("setStripeCurrencyParagraph")}</Paragraph>
          <Box width={1}>
            <Field
              name="stripeCurrency"
              component={FormSelect}
              label={t("stripeCurrencyLabel")}
              placeholder={t("stripeCurrencyPlaceholder")}
              items={currencies}
            />
          </Box>
          <Box width={1}>
            <Flex mx={-2} flexDirection={["column", "row"]}>
              {!!stripeCurrency && (
                <Box width={[1, 1 / 2]} px={2} mb={[3, 0]}>
                  <Button
                    styleName="blue"
                    type="button"
                    onClick={onClose}
                    width="100%"
                  >
                    {t("cancel")}
                  </Button>
                </Box>
              )}
              <Box width={stripeCurrency ? [1, 1 / 2] : 1} px={2}>
                <Button
                  styleName="blue"
                  type="submit"
                  disabled={
                    !(values.stripeCurrency && values.stripeCurrency.value)
                  }
                  width="100%"
                >
                  {t("setStripeCurrency")}
                </Button>
              </Box>
            </Flex>
          </Box>
        </Flex>
      )}
    />
  </Modal>
);

StripeCurrencyModal.propTypes = {
  isOpen: bool.isRequired,
  onClose: func.isRequired,
  setStripeCurrency: func.isRequired,
  t: func.isRequired,
  stripeCurrency: string
};

StripeCurrencyModal.defaultProps = {
  stripeCurrency: null
};

export default StripeCurrencyModal;
