import { useState } from "react";
import { FormInput, H3, Button, LoadingIndicator } from "components";
import { Form as FinalForm } from "react-final-form";
import { func, shape } from "prop-types";
import { Flex, Box } from "@rebass/grid";
import { isNumber, isPositiveInt } from "utils/validators";
import { Form } from "./styled";

const TableForm = ({ t, initialValues, setEditedTableId, addTable }) => {
  const [isSending, setIsSending] = useState(false);

  return (
    <FinalForm
      initialValues={initialValues}
      onSubmit={addTable}
      subscription={{
        handleSubmit: true,
        form: true
      }}
      render={({ handleSubmit, form: { reset } }) => {
        const resetForm = (shouldRemoveData = true) => {
          setIsSending(false);
          if (shouldRemoveData) {
            setEditedTableId(null);
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
                      resetForm(false);
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
                <H3>{t("addTable")}</H3>
                <Flex mx={-2} flexWrap="wrap">
                  <Box width={[1, 1 / 3]} px={2}>
                    <FormInput
                      name="number"
                      validate={isNumber(t)}
                      label={t("numberLabel")}
                      placeholder={t("numberPlaceholder")}
                    />
                  </Box>
                  <Box width={[1, 1 / 3]} px={2}>
                    <FormInput
                      name="numberOfSeats"
                      validate={isPositiveInt(t)}
                      label={t("numberOfSeatsLabel")}
                      placeholder={t("numberOfSeatsPlaceholder")}
                    />
                  </Box>
                  <Box mb={3} width={[1, 1 / 3]} px={2}>
                    <Button fluid fullHeight styleName="blue" type="submit">
                      {t("addTable")}
                    </Button>
                  </Box>
                </Flex>
              </>
            )}
          </Form>
        );
      }}
    />
  );
};

TableForm.propTypes = {
  t: func.isRequired,
  addTable: func.isRequired,
  setEditedTableId: func.isRequired,
  initialValues: shape({}).isRequired
};

export default TableForm;
