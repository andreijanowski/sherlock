import { useState, useEffect } from "react";
import { func, shape, bool } from "prop-types";
import { Form as FinalForm } from "react-final-form";
import { Flex } from "@rebass/grid";

import { H3, LoadingIndicator, RawCheckbox } from "components";
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
  isMovableBusiness,
  addNewPeriod,
  checkIfAlwaysOpen
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
  const [isAlwaysOpen, setIsAlwaysOpen] = useState(
    checkIfAlwaysOpen(initialValues)
  );

  useEffect(() => {
    setIsAlwaysOpen(checkIfAlwaysOpen(initialValues));
  }, [initialValues]);

  const paste = weekday => {
    if (copied && copied.length) {
      copied.forEach(c => {
        addPeriod(parsePeriod({ ...c, weekday }));
      });
    }
    return null;
  };

  const handleOnChange = values => {
    weekdays.forEach(weekday => {
      // eslint-disable-next-line no-prototype-builtins
      const dayExists = values.hasOwnProperty(`day-${weekday}`);

      if (dayExists) {
        removePeriod(values[`day-${weekday}`][0].id);
      }

      if (!isAlwaysOpen) {
        addNewPeriod(addPeriod, weekday);
      }
    });
  };

  return initialValues ? (
    <FinalForm
      onSubmit={() => null}
      initialValues={initialValues}
      mutators={{ ...{ ...arrayMutators, setFieldData } }}
      subscription={{ form: true, values: true }}
      render={({ form: { mutators }, values }) => (
        <Form>
          <Flex alignItems="center" justifyContent="space-between">
            <H3>{t("openingHours")}</H3>
            <RawCheckbox
              name="isAlwaysOpen"
              label="24/7"
              input={{
                onChange: () => {
                  handleOnChange(values);
                  setIsAlwaysOpen(!isAlwaysOpen);
                },
                value: isAlwaysOpen
              }}
            />
          </Flex>
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
                key: weekday,
                setIsAlwaysOpen
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
