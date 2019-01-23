import { func, arrayOf, shape, string } from "prop-types";
import { FieldArray } from "react-final-form-arrays";
import arrayMutators from "final-form-arrays";
import { Form as FinalForm } from "react-final-form";
import { H3 } from "components";
import Member from "./Member";
import { Form } from "../styled";

const generateMembersArray = m => {
  const members = m || [];
  if (members.length < 5) {
    for (let i = members.length; i < 5; i += 1) {
      members.push({
        email: "",
        role: ""
      });
    }
  }
  return members;
};

const MembersForm = ({ t, members, deleteMember }) => (
  <FinalForm
    onSubmit={v => console.log(v)}
    initialValues={{
      members: generateMembersArray(members)
    }}
    mutators={{ ...arrayMutators }}
    render={({ handleSubmit }) => (
      <Form onSubmit={handleSubmit} width={[1, 1, 1]} mx={0}>
        <H3>{t("members")}</H3>
        <FieldArray name="members">
          {({ fields }) =>
            fields.map((name, index) => (
              <Member
                {...{ name, fields, index, t, deleteMember, key: name }}
              />
            ))
          }
        </FieldArray>
      </Form>
    )}
  />
);

MembersForm.propTypes = {
  t: func.isRequired,
  deleteMember: func.isRequired,
  members: arrayOf(shape({ email: string, role: string }))
};

MembersForm.defaultProps = {
  members: []
};

export default MembersForm;
