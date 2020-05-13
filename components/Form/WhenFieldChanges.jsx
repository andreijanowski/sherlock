import { Field } from "react-final-form";
import { OnChange } from "react-final-form-listeners";
import { string, any, bool } from "prop-types";

const WhenFieldChanges = ({ field, set, to, shouldChange = true }) => (
  <Field name={set} subscription={{}}>
    {({ input: { onChange } }) => (
      <OnChange name={field}>
        {() => {
          if (shouldChange) {
            onChange(to);
          }
        }}
      </OnChange>
    )}
  </Field>
);

WhenFieldChanges.propTypes = {
  field: string.isRequired,
  set: string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types, react/require-default-props
  to: any,
  shouldChange: bool
};

WhenFieldChanges.defaultProps = {
  shouldChange: true
};

export default WhenFieldChanges;
