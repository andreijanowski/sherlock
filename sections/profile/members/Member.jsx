import { required, validateEmail } from "utils/validators";
import { FormInput, FormCheckbox, ActionIcon } from "components";
import { Box } from "@rebass/grid";
import { func, shape, string, number } from "prop-types";
import { Wrapper } from "./styled";
import { Actions } from "../styled";

const Member = ({ name, fields, index, t, removeMember }) => (
  <Wrapper key={name}>
    <Box width={[1, 1 / 2]} pr={2}>
      <FormInput
        label={t("emailLabel")}
        placeholder={t("emailPlaceholder")}
        name={`${name}.email`}
        validate={fields.value[index].role && validateEmail(t)}
        isErrorVisibilityRequired={!!fields.value[index].role}
        fieldProps={{
          disabled: fields.value[index].id !== undefined
        }}
        type="text"
      />
    </Box>
    <Box width={[2 / 3, 1 / 3]} pl={[0, 2]}>
      <FormInput
        label={t("roleLabel")}
        placeholder={t("rolePlaceholder")}
        name={`${name}.role`}
        isErrorVisibilityRequired={!!fields.value[index].email}
        validate={fields.value[index].email && required(t)}
      />
    </Box>
    <Box width={[2 / 3, 1 / 3]} pl={[0, 2]}>
      <FormCheckbox
        name={`${name}.businessManager`}
        label={t("businessManagerLabel")}
      />
    </Box>
    <Box width={[1 / 3, 1 / 6]}>
      <Actions justifyContent="center">
        <ActionIcon
          size="sm"
          icon={["fa", "minus"]}
          red
          onClick={() => {
            if (fields.value[index].id) {
              removeMember(fields.value[index].id);
            }
            fields.remove(index);
            if (fields.value.length <= 1) {
              fields.push({
                email: "",
                role: ""
              });
            }
          }}
        />
        {fields.length === index + 1 && (
          <ActionIcon
            onClick={() => {
              fields.push({
                email: "",
                role: ""
              });
            }}
            size="sm"
            icon={["fa", "plus"]}
          />
        )}
      </Actions>
    </Box>
  </Wrapper>
);

Member.propTypes = {
  name: string.isRequired,
  fields: shape().isRequired,
  index: number.isRequired,
  t: func.isRequired,
  removeMember: func.isRequired
};

export default Member;
