import { Form } from "react-final-form";
import arrayMutators from "final-form-arrays";
import { FieldArray } from "react-final-form-arrays";
import { FORM_ERROR } from "final-form";
import { func, number } from "prop-types";
import { FormInput, ActionIcon, Button } from "components";
import { isInteger } from "utils/validators";
import { Box, Flex } from "@rebass/grid";
import { Error } from "./styled";

const SplitForm = ({ t, partySize, onClose, onSplit }) => (
  <Form
    onSubmit={onSplit}
    mutators={{
      ...arrayMutators
    }}
    initialValues={{
      tickets: [
        { partySize: Math.floor(partySize / 2) },
        { partySize: Math.ceil(partySize / 2) }
      ]
    }}
    subscription={{ handleSubmit: true, error: true }}
    validate={v => {
      const newPartySize = v.tickets.reduce((p, c) => {
        const ps = Number(c.partySize);
        return Number.isNaN(ps) ? p : p + ps;
      }, 0);
      return newPartySize === partySize
        ? undefined
        : { [FORM_ERROR]: t("invalidSplit", { newPartySize, partySize }) };
    }}
    render={({ handleSubmit, error }) => (
      <Flex onSubmit={handleSubmit} as="form" width={1} flexDirection="column">
        <Flex mx={-2} flexWrap="wrap">
          <FieldArray name="tickets">
            {({ fields }) =>
              fields.map((name, index) => (
                <Flex alignItems="center" width={1 / 2} px={2}>
                  <Box width="calc(100% - 96px)">
                    <FormInput
                      label={t("partySize")}
                      key={name}
                      name={`${name}.partySize`}
                      validate={isInteger(t, {
                        min: 1,
                        max: partySize - fields.length + 1
                      })}
                    />
                  </Box>
                  <Box width={48} mb={3}>
                    {fields.length > 2 && (
                      <ActionIcon
                        size="sm"
                        icon={["fa", "minus"]}
                        red
                        onClick={() => {
                          fields.remove(index);
                        }}
                      />
                    )}
                  </Box>
                  <Box width={48} mb={3}>
                    {index === fields.length - 1 && (
                      <ActionIcon
                        size="sm"
                        icon={["fa", "plus"]}
                        green
                        onClick={() => {
                          fields.push({ partySize: 1 });
                        }}
                      />
                    )}
                  </Box>
                </Flex>
              ))
            }
          </FieldArray>
        </Flex>
        <Flex flexDirection={["column-reverse", "row"]} mx={-2}>
          <Box width={1 / 2} px={2}>
            <Button styleName="blue" fluid type="button" onClick={onClose}>
              {t("cancel")}
            </Button>
          </Box>
          <Box width={1 / 2} px={2}>
            <Button styleName="blue" type="submit" fluid disabled={error}>
              {t("split")}
            </Button>
          </Box>
        </Flex>
        <Error pt={2}>{error}</Error>
      </Flex>
    )}
  />
);

SplitForm.propTypes = {
  t: func.isRequired,
  onClose: func.isRequired,
  onSplit: func.isRequired,
  partySize: number.isRequired
};

export default SplitForm;
