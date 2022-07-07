import { useState, useEffect } from "react";
import { func, shape, bool, string } from "prop-types";
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
  isLocationVisible,
  currentPage,
  hasHiddenTitle,
  padding
}) => {
  const [isAlwaysOpen, setIsAlwaysOpen] = useState(
    checkIfAlwaysOpen(initialValues)
  );

  useEffect(() => {
    setIsAlwaysOpen(checkIfAlwaysOpen(initialValues));
  }, [initialValues]);

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
        <Form p={padding || "4"}>
          <Flex alignItems="center" justifyContent="space-between">
            {!hasHiddenTitle && <H3>{t("openingHours")}</H3>}
            {currentPage === "orderingHours" && (
              <RawCheckbox
                label="24/7"
                input={{
                  onChange: () => {
                    handleOnChange(values);
                    setIsAlwaysOpen(!isAlwaysOpen);
                  },
                  value: isAlwaysOpen
                }}
              />
            )}
          </Flex>
          {weekdays.map(weekday => (
            <Day
              t={t}
              values={values}
              weekday={weekday}
              addPeriod={addPeriod}
              updatePeriod={updatePeriod}
              removePeriod={removePeriod}
              isLocationVisible={isLocationVisible}
              mutators={mutators}
              key={weekday}
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
  isLocationVisible: bool,
  currentPage: string.isRequired,
  hasHiddenTitle: bool,
  padding: string
};

PeriodsForm.defaultProps = {
  initialValues: null,
  isLocationVisible: false,
  hasHiddenTitle: false,
  padding: 4
};

export default PeriodsForm;

export { parsePeriods, isMovableBusiness };
