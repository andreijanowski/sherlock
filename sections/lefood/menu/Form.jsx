import { useState } from "react";
import {
  FormInput,
  FormTextarea,
  FormDropdown,
  H3,
  Button,
  FormCheckbox,
  PerfectSquare,
  DropzoneWithCropper,
  Picture,
  LoadingIndicator
} from "components";
import { Form as FinalForm, Field } from "react-final-form";
import { func, shape } from "prop-types";
import { Flex, Box } from "@rebass/grid";
import { normalizePrice } from "utils/normalizers";
import { required } from "utils/validators";
import { Form } from "./styled";

const DishForm = ({
  t,
  addPicture,
  removePicture,
  initialValues,
  initialPicture,
  setEditedDishId,
  addDish,
  categories
}) => {
  const [picture, setPicture] = useState(null);
  const [isSending, setIsSending] = useState(false);

  return (
    <FinalForm
      initialValues={initialValues}
      onSubmit={addDish}
      subscription={{
        handleSubmit: true,
        form: true
      }}
      render={({ handleSubmit, form: { reset } }) => {
        const resetForm = (shouldRemoveData = true) => {
          setIsSending(false);
          if (shouldRemoveData) {
            setPicture(null);
            setEditedDishId(null);
            reset();
          }
        };
        return (
          <Form
            onSubmit={e => {
              const promise = handleSubmit(e);
              if (promise && promise.then) {
                setIsSending(true);
                promise
                  .then(dish => {
                    if (
                      picture &&
                      (dish.status === 201 || dish.status === 200)
                    ) {
                      addPicture(picture, dish.rawData.data.id)
                        .then(() => {
                          resetForm();
                        })
                        .catch(() => {
                          resetForm(false);
                        });
                    } else {
                      resetForm();
                    }
                  })
                  .catch(() => {
                    resetForm(false);
                  });
              }
            }}
          >
            {isSending ? (
              <LoadingIndicator />
            ) : (
              <>
                <H3>{t("addDish")}</H3>
                <Flex>
                  <Box width={152} pr={3} pb={3}>
                    {initialPicture ? (
                      <Picture
                        {...{ ...initialPicture, remove: removePicture }}
                      />
                    ) : (
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
                          saveImage={pic => setPicture(pic)}
                        />
                      </PerfectSquare>
                    )}
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
                    items={categories}
                  />
                </Box>
                <Box my={4}>
                  <FormCheckbox name="available" label={t("availability")} />
                </Box>
                <Box mb={3}>
                  <Button fluid styleName="blue" type="submit">
                    {!initialValues.name ? t("addToMenu") : t("Save")}
                  </Button>
                </Box>
              </>
            )}
          </Form>
        );
      }}
    />
  );
};

DishForm.propTypes = {
  t: func.isRequired,
  addDish: func.isRequired,
  addPicture: func.isRequired,
  removePicture: func.isRequired,
  setEditedDishId: func.isRequired,
  initialValues: shape({}).isRequired,
  initialPicture: shape({}),
  categories: shape().isRequired
};

DishForm.defaultProps = {
  initialPicture: undefined
};

export default DishForm;
