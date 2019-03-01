import {
  FormInput,
  FormTextarea,
  FormDropdown,
  H3,
  Button,
  FormCheckbox,
  PerfectSquare,
  DropzoneWithCropper
} from "components";
import { Form as FinalForm, Field } from "react-final-form";
import { func } from "prop-types";
import { Flex, Box } from "@rebass/grid";
import { normalizePrice } from "utils/normalizers";
import { required } from "utils/validators";
import { Form } from "./styled";

const DishForm = ({ t, addDish }) => (
  <FinalForm
    initialValues={{
      category: "trays"
    }}
    onSubmit={addDish}
    render={({ handleSubmit, form: { reset } }) => (
      <Form
        onSubmit={e => {
          const promise = handleSubmit(e);
          if (promise && promise.then) {
            promise.then(() => reset());
          }
        }}
      >
        <H3>{t("addDish")}</H3>
        <Flex>
          <Box width={152} pr={3} pb={3}>
            <PerfectSquare>
              <DropzoneWithCropper
                tip={t("chooseOrDragFile")}
                info={t("picturesInfo")}
                errorTipType={t("invalidFiles")}
                errorInfoType={t("validImages")}
                crop={t("app:crop")}
                cancel={t("app:cancel")}
                multiple={false}
                maxWidth={4096}
                maxHeight={4096}
                image={undefined}
                saveImage={e => console.log(e)}
              />
            </PerfectSquare>
          </Box>
          <Flex flexDirection="column" width="calc(100% - 152px)">
            <Box>
              <FormInput
                name="name"
                validate={required(t)}
                label={t("nameLabel")}
                placeholder={t("namePlaceholder")}
              />
            </Box>
            <Box>
              <FormInput
                name="pricePerItemCents"
                validate={required(t)}
                label={t("pricePerItemCentsLabel")}
                placeholder={t("pricePerItemCentsPlaceholder")}
                parse={normalizePrice}
              />
            </Box>
          </Flex>
        </Flex>
        <Box>
          <FormTextarea
            rows={3}
            name="description"
            label={t("descriptionLabel")}
            placeholder={t("descriptionPlaceholder")}
          />
        </Box>
        <Box>
          <Field
            name="category"
            component={FormDropdown}
            label={t("categoryLabel")}
            items={[
              { label: t("trays"), value: "trays" },
              { label: t("desserts"), value: "desserts" },
              { label: t("softDrinks"), value: "soft_drinks" }
            ]}
          />
        </Box>
        <Box my={4}>
          <FormCheckbox name="unavailable" label={t("availability")} />
        </Box>
        <Box mb={3}>
          <Button fluid styleName="blue" type="submit">
            {t("addToMenu")}
          </Button>
        </Box>
      </Form>
    )}
  />
);

DishForm.propTypes = {
  t: func.isRequired,
  addDish: func.isRequired
};

export default DishForm;
