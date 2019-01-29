import { func, arrayOf, shape, string } from "prop-types";
import { FieldArray } from "react-final-form-arrays";
import arrayMutators from "final-form-arrays";
import setFieldData from "final-form-set-field-data";
import { Form as FinalForm } from "react-final-form";
import { H3, AutoSave, LoadingIndicator } from "components";
import Member from "./Member";
import { Form } from "../styled";
import { generateMembersArray } from "./utils";

const MembersForm = ({ t, members, removeMember, handleSubmit }) =>
  members ? (
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
                  save={async v => {
                    const res = await handleSubmit(v);
                    if (res && res.status === 201) {
                      const member = res.rawData.data;
                      const removeIndex = fields.value.findIndex(
                        i => i.email === v[0].email && i.role === v[0].role
                      );
                      fields.remove(removeIndex);
                      const insertIndex = fields.value.findIndex(
                        i => !(i.email || i.role)
                      );
                      fields.insert(insertIndex, {
                        id: member.id,
                        ...member.attributes
                      });
                    }
                  }}
                  array="members"
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
