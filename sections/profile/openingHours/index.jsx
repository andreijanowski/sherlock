import { func, shape } from "prop-types";
import { Form as FinalForm } from "react-final-form";
import { H3 } from "components";
import arrayMutators from "final-form-arrays";
import { Form } from "../styled";
import Day from "./Day";
import { weekdays } from "./utils";

const OpeningHoursForm = ({
  t,
  initialValues,
  addOpenPeriod,
  updateOpenPeriod,
  removeOpenPeriod
}) =>
  initialValues ? (
    <FinalForm
      onSubmit={v => console.log(v)}
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
                addOpenPeriod,
                updateOpenPeriod,
                removeOpenPeriod,
                key: weekday
              }}
            />
          ))}
        </Form>
      )}
    />
  ) : null;

OpeningHoursForm.propTypes = {
  t: func.isRequired,
  addOpenPeriod: func.isRequired,
  updateOpenPeriod: func.isRequired,
  removeOpenPeriod: func.isRequired,
  initialValues: shape()
};

OpeningHoursForm.defaultProps = {
  initialValues: null
};

export default OpeningHoursForm;
