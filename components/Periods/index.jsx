import { func, shape } from "prop-types";
import { Form as FinalForm } from "react-final-form";
import { H3, LoadingIndicator } from "components";
import arrayMutators from "final-form-arrays";
import { Form } from "./styled";
import Day from "./Day";
import { weekdays, parsePeriods, parsePeriod } from "./utils";

const PeriodsForm = ({
  t,
  initialValues,
  addPeriod,
  updatePeriod,
  removePeriod,
  copy,
  paste
}) =>
  initialValues ? (
    <FinalForm
      onSubmit={() => null}
      initialValues={initialValues}
      mutators={{ ...{ ...arrayMutators } }}
      render={() => (
        <Form>
          <H3>{t("openingHours")}</H3>
          {weekdays.map(weekday => (
            <Day
              {...{
                t,
                weekday,
                addPeriod,
                updatePeriod,
                removePeriod,
                copy,
                paste,
                key: weekday
              }}
            />
          ))}
        </Form>
      )}
    />
  ) : (
    <LoadingIndicator />
  );

PeriodsForm.propTypes = {
  t: func.isRequired,
  addPeriod: func.isRequired,
  updatePeriod: func.isRequired,
  removePeriod: func.isRequired,
  initialValues: shape(),
  copy: func.isRequired,
  paste: func.isRequired
};

PeriodsForm.defaultProps = {
  initialValues: null
};

export default PeriodsForm;

export { parsePeriods, parsePeriod };
