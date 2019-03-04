import { PureComponent } from "react";
import { func, arrayOf, shape, string } from "prop-types";
import { FieldArray } from "react-final-form-arrays";
import arrayMutators from "final-form-arrays";
import setFieldData from "final-form-set-field-data";
import { Form as FinalForm } from "react-final-form";
import { H3, AutoSave, LoadingIndicator } from "components";
import Member from "./Member";
import { Form } from "../styled";
import { generateMembersArray } from "./utils";

class MembersForm extends PureComponent {
  save = async (values, fields) => {
    const { handleSubmit } = this.props;
    const res = await handleSubmit(values);
    if (res && res.status === 201) {
      const member = res.rawData.data;
      const removeIndex = fields.value.findIndex(
        i => i.email === values[0].email && i.role === values[0].role
      );
      fields.remove(removeIndex);
      const insertIndex = fields.value.findIndex(i => !(i.email || i.role));
      fields.insert(insertIndex, {
        id: member.id,
        ...member.attributes
      });
    }
  };

  render() {
    const { t, members, removeMember, handleSubmit } = this.props;
    return members ? (
      <FinalForm
        onSubmit={handleSubmit}
        initialValues={{
          members: generateMembersArray(members)
        }}
        mutators={{ ...arrayMutators, setFieldData }}
        render={({ form: { mutators } }) => (
          <Form>
            <H3>{t("members")}</H3>
            <FieldArray name="members">
              {({ fields }) => {
                const membersArray = fields.map((name, index) => (
                  <Member
                    {...{ name, fields, index, t, removeMember, key: name }}
                  />
                ));
                return [
                  <AutoSave
                    setFieldData={mutators.setFieldData}
                    save={v => this.save(v, fields)}
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
    ) : (
      <LoadingIndicator />
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