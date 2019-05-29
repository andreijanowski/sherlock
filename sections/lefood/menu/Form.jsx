import { PureComponent } from "react";
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

class DishForm extends PureComponent {
  state = {
    picture: null
  };

  render() {
    const { t, addPicture, addDish } = this.props;
    const { picture } = this.state;
    return (
      <FinalForm
        initialValues={{
          category: "mains"
        }}
        onSubmit={addDish}
        subscription={{
          handleSubmit: true,
          form: true
        }}
        render={({ handleSubmit, form: { reset } }) => (
          <form
            onSubmit={e => {
              const promise = handleSubmit(e);
              if (promise && promise.then) {
                promise.then(dish => {
                  if (picture && dish.status === 201) {
                    addPicture(picture, dish.rawData.data.id);
                  }
                  this.setState({ picture: null });
                  reset();
                });
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
                    image={picture}
                    saveImage={pic => this.setState({ picture: pic })}
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
                  { label: t("mains"), value: "mains" },
                  { label: t("desserts"), value: "desserts" },
                  { label: t("softs"), value: "softs" },
                  { label: t("formulas"), value: "formulas" },
                  { label: t("starters"), value: "starters" },
                  { label: t("sides"), value: "sides" },
                  { label: t("pastries"), value: "pastries" },
                  { label: t("coffee"), value: "coffee" },
                  { label: t("beer"), value: "beer" },
                  { label: t("wine"), value: "wine" },
                  { label: t("cocktails"), value: "cocktails" },
                  { label: t("other"), value: "other" }
                ]}
              />
            </Box>
            <Box my={4}>
              <FormCheckbox name="available" label={t("availability")} />
            </Box>
            <Box mb={3}>
              <Button fluid styleName="blue" type="submit">
                {t("addToMenu")}
              </Button>
            </Box>
          </form>
        )}
      />
    );
  }
}

DishForm.propTypes = {
  t: func.isRequired,
  addDish: func.isRequired,
  addPicture: func.isRequired
};

export default DishForm;
