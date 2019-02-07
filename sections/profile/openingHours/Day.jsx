import { PureComponent } from "react";
import { RawCheckbox, ActionIcon, FormTimePicker } from "components";
import { Flex, Box } from "@rebass/grid";
import { FieldArray } from "react-final-form-arrays";
import { func, number } from "prop-types";
import { Actions } from "../styled";
import { Action, Line } from "./styled";
import { addNewOpenPeriod } from "./utils";

class Day extends PureComponent {
  state = {
    isRequestPending: false
  };

  handleChange = fields => {
    const { removeOpenPeriod, addOpenPeriod, weekday } = this.props;
    if (fields.length) {
      for (let i = 0; i < fields.length; i += 1) {
        removeOpenPeriod(fields.value[i].id);
        fields.remove(0);
      }
    } else {
      addNewOpenPeriod(addOpenPeriod, fields, weekday);
    }
  };

  handleBlur = async (value, fields, index, fieldName) => {
    try {
      const { updateOpenPeriod } = this.props;
      this.setState({ isRequestPending: true });
      await updateOpenPeriod({
        ...fields.value[index],
        [fieldName]: value
      });
      this.setState({ isRequestPending: false });
    } catch (e) {
      console.log(e);
    }
  };

  remove = (fields, index) => {
    const { removeOpenPeriod } = this.props;
    removeOpenPeriod(fields.value[index].id);
    fields.remove(index);
  };

  render() {
    const { t, weekday, addOpenPeriod, copy, paste } = this.props;
    const { isRequestPending } = this.state;
    return (
      <FieldArray name={`day-${weekday}`}>
        {({ fields }) => (
          <>
            <Flex width={1} flexDirection={["column", "row"]}>
              <Box width={[1, 1 / 6]} mt="24px" mb="8px">
                <RawCheckbox
                  label={t(`weekdays.${weekday}`)}
                  input={{
                    onChange: () => this.handleChange(fields),
                    value: !!fields.length
                  }}
                />
              </Box>
              <Box width={[1, 1 / 12]} mt={34}>
                {fields.value && fields.value.length && (
                  <Action onClick={() => copy(fields.value)}>
                    {t("copy")}
                  </Action>
                )}
              </Box>
              <Box width={[1, 1 / 12]} mt={34}>
                <Action onClick={() => paste(weekday)}>{t("paste")}</Action>
              </Box>
              <Flex flexDirection="column" width={[1, 2 / 3]} mt="12px">
                {fields.map((name, index) => (
                  <Flex alignItems="center" key={name}>
                    <Box width="calc(50% - 48px)" px={2}>
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
                    <Box width="calc(50% - 48px)" px={2}>
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
                            addNewOpenPeriod(addOpenPeriod, fields, weekday)
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
  addOpenPeriod: func.isRequired,
  updateOpenPeriod: func.isRequired,
  removeOpenPeriod: func.isRequired,
  weekday: number.isRequired,
  copy: func.isRequired,
  paste: func.isRequired
};

export default Day;
