import { Field } from "react-final-form";
import { string, func } from "prop-types";

const groups = ["types", "cuisines", "foodsAndDrinks", "quirks", "diets"];

const GroupsErrorListener = ({ name, setFieldData, t }) => (
  <Field
    name={name}
    subscription={{ data: true }}
    render={({
      meta: {
        data: { error, invalidGroupName }
      }
    }) => {
      if (error) {
        groups.forEach(i =>
          setFieldData(i, {
            invalidGroupName: name,
            invalidGroupNameMessage: t(
              "forms:validation.error.invalidGroupNameMessage",
              { field: name }
            )
          })
        );
      } else if (invalidGroupName === name) {
        groups.forEach(i =>
          setFieldData(i, {
            invalidGroupName: "",
            invalidGroupNameMessage: ""
          })
        );
      }
      return null;
    }}
  />
);

GroupsErrorListener.propTypes = {
  name: string.isRequired,
  setFieldData: func.isRequired,
  t: func.isRequired
};

export default GroupsErrorListener;
