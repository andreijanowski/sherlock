import { required, validateEmail } from "utils/validators";
import { FormInput, ActionIcon } from "components";
import { Box } from "@rebass/grid";
import { func, arrayOf, shape, string, number } from "prop-types";
import { Wrapper, Inputs } from "./styled";
import { Actions } from "../styled";

const Member = ({ name, fields, index, t, deleteMember }) => (
  <Wrapper key={name}>
    <Inputs>
      <Box width={1 / 2} pr={2}>
        <FormInput
          label={t("emailLabel")}
          placeholder={t("emailPlaceholder")}
          name={`${name}.email`}
          validate={fields.value[index].email && validateEmail(t)}
          fieldProps={{
            disabled: fields.value[index].id !== undefined
          }}
          type="text"
        />
      </Box>
      <Box width={1 / 3} pl={2}>
        <FormInput
          label={t("roleLabel")}
          placeholder={t("rolePlaceholder")}
          name={`${name}.role`}
          validate={fields.value[index].email && required}
        />
      </Box>
    </Inputs>
    <Actions>
      <ActionIcon
        size="sm"
        icon={["fa", "minus"]}
        red
        onClick={() => {
          if (fields.value[index].id !== undefined) {
            deleteMember(fields.value[index].id);
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
  </Wrapper>
);

Member.propTypes = {
  name: string.isRequired,
  fields: arrayOf(
    shape({
      email: "",
      role: ""
    })
  ).isRequired,
  index: number.isRequired,
  t: func.isRequired,
  deleteMember: func.isRequired
};

export default Member;
