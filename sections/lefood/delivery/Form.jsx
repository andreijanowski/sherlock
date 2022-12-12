import { FormInput, H3, StyledButton } from "components";
import { Form as FinalForm } from "react-final-form";
import { func } from "prop-types";
import { Flex, Box } from "@rebass/grid";
import { normalizePrice } from "utils/normalizers";
import { required } from "utils/validators";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DeliveryForm = ({ t, addDelivery }) => (
  <FinalForm
    onSubmit={addDelivery}
    initialValues={{ freeFromCents: normalizePrice(0) }}
    subscription={{
      handleSubmit: true,
      form: true
    }}
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
            <StyledButton styleName="blue" type="submit">
              <Box px={1}>
                <FontAwesomeIcon icon={["fa", "plus"]} />
              </Box>
            </StyledButton>
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
