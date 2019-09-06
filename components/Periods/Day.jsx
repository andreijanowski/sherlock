import { PureComponent } from "react";
import {
  RawCheckbox,
  ActionIcon,
  FormTimePicker,
  FormInput,
  AutoSave
} from "components";
import { Flex, Box } from "@rebass/grid";
import { FieldArray } from "react-final-form-arrays";
import { func, number, bool, shape } from "prop-types";
import { Actions, Action, Line } from "./styled";
import { addNewPeriod, preparePeriodUpdate } from "./utils";

class Day extends PureComponent {
  state = {
    isRequestPending: false
  };

  handleChange = fields => {
    const { removePeriod, addPeriod, weekday } = this.props;
    if (fields.length) {
      for (let i = 0; i < fields.length; i += 1) {
        removePeriod(fields.value[i].id);
        fields.remove(0);
      }
    } else {
      addNewPeriod(addPeriod, weekday);
    }
  };

  handleBlur = value => {
    const { updatePeriod, addPeriod } = this.props;
    value.forEach(v => {
      const { updatedPeriod, newPeriod } = preparePeriodUpdate(v);
      if (newPeriod) {
        addPeriod(newPeriod);
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
      copy,
      isCopiedDefined,
      paste,
      isLocationVisible,
      mutators
    } = this.props;
    const { isRequestPending } = this.state;
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
            />
            <Flex
              width={1}
              flexDirection={["column", "column", "column", "row"]}
              justifyContent="space-between"
            >
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
                {fields.value && !!fields.value.length && (
                  <Box width="auto" mt={0}>
                    <Action onClick={() => copy(fields.value)}>
                      {t("copy")}
                    </Action>
                  </Box>
                )}
                <Box width="auto" mt={0}>
                  {isCopiedDefined && (
                    <Action onClick={() => paste(weekday)}>{t("paste")}</Action>
                  )}
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
            </Flex>
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
  copy: func.isRequired,
  paste: func.isRequired,
  isLocationVisible: bool.isRequired,
  isCopiedDefined: bool.isRequired,
  mutators: shape().isRequired
};

export default Day;
