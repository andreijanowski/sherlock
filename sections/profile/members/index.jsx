import { PureComponent } from "react";
import { func, arrayOf, shape, string } from "prop-types";
import { FieldArray } from "react-final-form-arrays";
import arrayMutators from "final-form-arrays";
import setFieldData from "final-form-set-field-data";
import { Form as FinalForm } from "react-final-form";
import { H3, AutoSave } from "components";
import Member from "./Member";
import { Form } from "../styled";
import { generateMembersArray } from "./utils";

class MembersForm extends PureComponent {
  save = async (values, fields) => {
    const { handleSubmit } = this.props;
    const res = await handleSubmit(values);
    if (res && res.status === 201) {
      const member = res.rawData.data;
      const index = fields.value.findIndex(
        i => i.email === values[0].email && i.role === values[0].role
      );
      fields.update(index, { id: member.id, ...member.attributes });
    }
  };

  render() {
    const { t, members, removeMember, handleSubmit } = this.props;
    return (
      <FinalForm
        onSubmit={handleSubmit}
        initialValues={{
          members: generateMembersArray(members)
        }}
        mutators={{ ...arrayMutators, setFieldData }}
        subscription={{
          form: true
        }}
        render={({ form: { mutators } }) => (
          <Form>
            <H3>{t("members")}</H3>
            <FieldArray name="members">
              {({ fields }) => {
                const membersArray = fields.map((name, index) => (
                  <Member
                    {...{
                      name,
                      fields,
                      index,
                      t,
                      removeMember,
                      key: name,
                      checkboxDisabled: !fields.value[index].id
                    }}
                  />
                ));
                return [
                  <AutoSave
                    setFieldData={mutators.setFieldData}
                    save={v => this.save(v, fields)}
                    t={t}
                    arrayName="members"
                    key="autoSave"
                  />,
                  ...membersArray
                ];
              }}
            </FieldArray>
          </Form>
        )}
      />
    );
  }
}

MembersForm.propTypes = {
  t: func.isRequired,
  removeMember: func.isRequired,
  handleSubmit: func.isRequired,
  members: arrayOf(shape({ email: string, role: string }))
};

MembersForm.defaultProps = {
  members: []
};

export default MembersForm;
