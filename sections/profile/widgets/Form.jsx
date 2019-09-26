import { useState } from "react";
import { FormInput, H3, Button, LoadingIndicator } from "components";
import { Form as FinalForm } from "react-final-form";
import { func, shape } from "prop-types";
import { Flex, Box } from "@rebass/grid";
import { required } from "utils/validators";
import { Form } from "./styled";

const WidgetForm = ({ t, initialValues, setEditedWidgetId, addWidget }) => {
  const [isSending, setIsSending] = useState(false);

  return (
    <FinalForm
      initialValues={initialValues}
      onSubmit={addWidget}
      subscription={{
        handleSubmit: true,
        form: true
      }}
      render={({ handleSubmit, form: { reset } }) => {
        const resetForm = (shouldRemoveData = true) => {
          setIsSending(false);
          if (shouldRemoveData) {
            setEditedWidgetId(null);
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
                    if (dish.status === 201 || dish.status === 200) {
                      resetForm();
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
                <H3>{t("addWidget")}</H3>
                <Flex>
                  <Box width={1}>
                    <FormInput
                      name="domains"
                      validate={required(t)}
                      label={t("domainsLabel")}
                      placeholder={t("domainsPlaceholder")}
                    />
                  </Box>
                </Flex>
                <Box mb={3}>
                  <Button fluid styleName="blue" type="submit">
                    {t("addWidget")}
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

WidgetForm.propTypes = {
  t: func.isRequired,
  addWidget: func.isRequired,
  setEditedWidgetId: func.isRequired,
  initialValues: shape({}).isRequired
};

export default WidgetForm;
