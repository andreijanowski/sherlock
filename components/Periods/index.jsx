import { useState } from "react";
import { func, shape, bool } from "prop-types";
import { Form as FinalForm } from "react-final-form";
import { H3, LoadingIndicator } from "components";
import arrayMutators from "final-form-arrays";
import setFieldData from "final-form-set-field-data";
import { Form } from "./styled";
import Day from "./Day";
import {
  weekdays,
  parsePeriods,
  parsePeriod,
  parseTime,
  timeToNumber,
  isMovableBusiness
} from "./utils";

const PeriodsForm = ({
  t,
  initialValues,
  addPeriod,
  updatePeriod,
  removePeriod,
  isLocationVisible
}) => {
  const [copied, copy] = useState(undefined);
  const paste = weekday => {
    if (copied && copied.length) {
      copied.forEach(async c => {
        addPeriod({ ...c, weekday });
      });
    }
    return null;
  };
  return initialValues ? (
    <FinalForm
      onSubmit={() => null}
      initialValues={initialValues}
      mutators={{ ...{ ...arrayMutators, setFieldData } }}
      subscription={{ form: true }}
      render={({ form: { mutators } }) => (
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
                isCopiedDefined: !!copied,
                paste,
                isLocationVisible,
                mutators,
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
};

PeriodsForm.propTypes = {
  t: func.isRequired,
  addPeriod: func.isRequired,
  updatePeriod: func.isRequired,
  removePeriod: func.isRequired,
  initialValues: shape(),
  isLocationVisible: bool
};

PeriodsForm.defaultProps = {
  initialValues: null,
  isLocationVisible: false
};

export default PeriodsForm;

export {
  parsePeriods,
  parsePeriod,
  parseTime,
  timeToNumber,
  isMovableBusiness
};
