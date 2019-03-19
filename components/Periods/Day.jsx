import { PureComponent } from "react";
import { RawCheckbox, ActionIcon, FormTimePicker } from "components";
import { Flex, Box } from "@rebass/grid";
import { FieldArray } from "react-final-form-arrays";
import { func, number } from "prop-types";
import { Actions, Action, Line } from "./styled";
import { addNewPeriod } from "./utils";

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
      addNewPeriod(addPeriod, fields, weekday);
    }
  };

  handleBlur = async (value, fields, index, fieldName) => {
    try {
      const { updatePeriod } = this.props;
      this.setState({ isRequestPending: true });
      await updatePeriod({
        ...fields.value[index],
        [fieldName]: value
      });
      this.setState({ isRequestPending: false });
    } catch (e) {
      console.log(e);
    }
  };

  remove = (fields, index) => {
    const { removePeriod } = this.props;
    removePeriod(fields.value[index].id);
    fields.remove(index);
  };

  render() {
    const { t, weekday, addPeriod, copy, paste } = this.props;
    const { isRequestPending } = this.state;
    return (
      <FieldArray name={`day-${weekday}`}>
        {({ fields }) => (
          <>
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
                {fields.value && fields.value.length && (
                  <Box width="auto" mt={0}>
                    <Action onClick={() => copy(fields.value)}>
                      {t("copy")}
                    </Action>
                  </Box>
                )}
                <Box width="auto" mt={0}>
                  <Action onClick={() => paste(weekday)}>{t("paste")}</Action>
                </Box>
              </Flex>
              <Flex flexDirection="column" width={[1, 1, 1, 0.6]} mt="12px">
                {fields.map((name, index) => (
                  <Flex alignItems="center" key={name} flexWrap="wrap">
                    <Box width={[1, "calc(50% - 48px)"]} px={2}>
                      <FormTimePicker
                        name={`${name}.openedFrom`}
                        label={t("openedFromLabel")}
                        placeholder={t("openedFromPlaceholder")}
                        loading={isRequestPending}
                        handleBlur={value =>
                          this.handleBlur(value, fields, index, "openedFrom")
                        }
                      />
                    </Box>
                    <Box width={[1, "calc(50% - 48px)"]} px={2}>
                      <FormTimePicker
                        name={`${name}.openedTo`}
                        label={t("openedToLabel")}
                        placeholder={t("openedToPlaceholder")}
                        loading={isRequestPending}
                        handleBlur={value =>
                          this.handleBlur(value, fields, index, "openedTo")
                        }
                      />
                    </Box>
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
                          onClick={() =>
                            addNewPeriod(addPeriod, fields, weekday)
                          }
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
  paste: func.isRequired
};

export default Day;
