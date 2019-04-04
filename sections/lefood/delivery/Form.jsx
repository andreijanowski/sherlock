import { FormInput, H3, Button } from "components";
import { Form as FinalForm } from "react-final-form";
import { func } from "prop-types";
import { Flex, Box } from "@rebass/grid";
import { normalizePrice } from "utils/normalizers";
import { required } from "utils/validators";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DeliveryForm = ({ t, addDelivery }) => (
  <FinalForm
    onSubmit={addDelivery}
    render={({ handleSubmit, form: { reset } }) => (
      <form
        onSubmit={e => {
          const promise = handleSubmit(e);
          if (promise && promise.then) {
            promise.then(() => reset());
          }
        }}
      >
        <H3>{t("delivery")}</H3>
        <Flex alignItems="center">
          <Box mr={2}>
            <FormInput
              name="code"
              validate={required(t)}
              label={t("codeLabel")}
              placeholder={t("codePlaceholder")}
            />
          </Box>
          <Box mr={2}>
            <FormInput
              name="priceCents"
              validate={required(t)}
              label={t("priceCentsLabel")}
              placeholder={t("priceCentsPlaceholder")}
              parse={normalizePrice}
            />
          </Box>
          <Box mr={2}>
            <FormInput
              name="freeFromCents"
              label={t("freeFromCentsLabel")}
              placeholder={t("freeFromCentsPlaceholder")}
              parse={normalizePrice}
            />
          </Box>
          <Box mb={3}>
            <Button styleName="blue" type="submit">
              <Box px={1}>
                <FontAwesomeIcon icon={["fa", "plus"]} />
              </Box>
            </Button>
          </Box>
        </Flex>
      </form>
    )}
  />
);

DeliveryForm.propTypes = {
  t: func.isRequired,
  addDelivery: func.isRequired
};

export default DeliveryForm;
