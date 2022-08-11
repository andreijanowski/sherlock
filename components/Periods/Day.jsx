import { PureComponent } from "react";
import { Box, Flex } from "@rebass/grid";
import { FieldArray } from "react-final-form-arrays";
import { bool, func, number, shape } from "prop-types";

import {
  ActionIcon,
  AutoSave,
  FormInput,
  FormTimePicker,
  LoadingIndicator,
  RawCheckbox
} from "components";
import { validateEndDateFormat } from "utils/validators";
import { Actions, DayContainer, Line } from "./styled";
import { addNewPeriod, preparePeriodUpdate } from "./utils";

class Day extends PureComponent {
  state = {
    isRequestPending: false,
    isUpdating: false
  };

  handleChange = async fields => {
    const { removePeriod, addPeriod, weekday, values } = this.props;
    if (fields.length) {
      for (let i = 0; i < fields.length; i += 1) {
        removePeriod(fields.value[i].id);
        fields.remove(0);
      }
    } else {
      this.setState({ isUpdating: true });
      try {
        await addNewPeriod(addPeriod, weekday, values);
      } catch (e) {
        console.error(e);
      } finally {
        this.setState({ isUpdating: false });
      }
    }
  };

  handleBlur = (value, fields) => {
    const { updatePeriod, removePeriod } = this.props;

    value.forEach(v => {
      const { updatedPeriod, idToDelete } = preparePeriodUpdate(
        v,
        fields.value
      );
      if (idToDelete) {
        removePeriod(idToDelete);
        fields.remove(0);
      }
      updatePeriod(updatedPeriod);
    });
  };

  remove = (fields, index) => {
    const { removePeriod } = this.props;
    removePeriod(fields.value[index].id);
    fields.remove(index);
  };

  render() {
    const {
      t,
      weekday,
      addPeriod,
      isLocationVisible,
      mutators,
      hasHiddenMessages
    } = this.props;
    const { isRequestPending, isUpdating } = this.state;
    return (
      <FieldArray name={`day-${weekday}`}>
        {({ fields }) => (
          <>
            <AutoSave
              setFieldData={mutators.setFieldData}
              save={v => this.handleBlur(v, fields)}
              t={t}
              arrayName={`day-${weekday}`}
              key="autoSave"
              hasHiddenMessages={hasHiddenMessages}
            />
            <DayContainer
              width={1}
              flexDirection={["column", "column", "column", "row"]}
              justifyContent="space-between"
            >
              {isUpdating && <LoadingIndicator />}
              <Flex
                justifyContent="space-between"
                alignItems="center"
                flexWrap={["wrap", "wrap", "wrap", "wrap", "nowrap"]}
                width={["auto", "auto", "auto", "auto", 0.3]}
              >
                <Box
                  width={["auto", "auto", "auto", 1, "auto"]}
                  mt="24px"
                  mb="8px"
                >
                  <RawCheckbox
                    label={t(`weekdays.${weekday}`)}
                    input={{
                      onChange: () => this.handleChange(fields),
                      value: !!fields.length
                    }}
                  />
                </Box>
              </Flex>
              <Flex flexDirection="column" width={[1, 1, 1, 0.6]} mt="12px">
                {fields.map((name, index) => (
                  <Flex alignItems="center" key={name} flexWrap="wrap">
                    <Box
                      width={[
                        1,
                        isLocationVisible ? 1 / 2 : "calc(50% - 48px)"
                      ]}
                      px={2}
                    >
                      <FormTimePicker
                        name={`${name}.openedFrom`}
                        label={t("openedFromLabel")}
                        placeholder={t("openedFromPlaceholder")}
                        loading={isRequestPending}
                      />
                    </Box>
                    <Box
                      width={[
                        1,
                        isLocationVisible ? 1 / 2 : "calc(50% - 48px)"
                      ]}
                      px={2}
                    >
                      <FormTimePicker
                        name={`${name}.openedTo`}
                        label={t("openedToLabel")}
                        placeholder={t("openedToPlaceholder")}
                        validate={validateEndDateFormat(t)}
                        loading={isRequestPending}
                      />
                    </Box>
                    {isLocationVisible && (
                      <Box width={[1, "calc(100% - 96px)"]} px={2}>
                        <FormInput
                          name={`${name}.location`}
                          label={t("locationLabel")}
                          placeholder={t("locationPlaceholder")}
                          loading={isRequestPending}
                        />
                      </Box>
                    )}
                    <Actions key={name}>
                      <ActionIcon
                        size="sm"
                        icon={["fa", "minus"]}
                        red
                        onClick={() => this.remove(fields, index)}
                      />
                      {index === fields.length - 1 && (
                        <ActionIcon
                          size="sm"
                          icon={["fa", "plus"]}
                          onClick={() => addNewPeriod(addPeriod, weekday)}
                        />
                      )}
                    </Actions>
                  </Flex>
                ))}
              </Flex>
            </DayContainer>
            {weekday !== 0 && <Line />}
          </>
        )}
      </FieldArray>
    );
  }
}

Day.propTypes = {
  t: func.isRequired,
  addPeriod: func.isRequired,
  updatePeriod: func.isRequired,
  removePeriod: func.isRequired,
  weekday: number.isRequired,
  isLocationVisible: bool.isRequired,
  mutators: shape().isRequired,
  values: shape().isRequired,
  hasHiddenMessages: bool
};

Day.defaultProps = {
  hasHiddenMessages: false
};

export default Day;
