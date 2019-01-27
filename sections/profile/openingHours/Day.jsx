import { RawCheckbox, ActionIcon, FormTimePicker } from "components";
import { Flex, Box } from "@rebass/grid";
import { FieldArray } from "react-final-form-arrays";
import { func, number } from "prop-types";
import { Actions } from "../styled";
import { Copy, Line } from "./styled";
import { addNewOpenPeriod } from "./utils";

const Day = ({
  t,
  weekday,
  addOpenPeriod,
  updateOpenPeriod,
  removeOpenPeriod
}) => (
  <FieldArray name={`day-${weekday}`}>
    {({ fields }) => (
      <>
        <Flex width={1} flexDirection={["column", "row"]}>
          <Box width={[1, 1 / 6]} mt="24px" mb="8px">
            <RawCheckbox
              label={t(`weekdays.${weekday}`)}
              input={{
                onChange: () => {
                  if (fields.length) {
                    for (let i = 0; i < fields.length; i += 1) {
                      removeOpenPeriod(fields.value[i].id);
                      fields.remove(0);
                    }
                  } else {
                    addNewOpenPeriod(addOpenPeriod, fields, weekday);
                  }
                },
                value: !!fields.length
              }}
            />
          </Box>
          <Box width={[1, 1 / 6]} mt={34}>
            <Copy>{t("copy")}</Copy>
          </Box>
          <Flex flexDirection="column" width={[1, 2 / 3]} mt="12px">
            {fields.map((name, index) => (
              <Flex alignItems="center" key={name}>
                <Box width="calc(50% - 48px)" px={2}>
                  <FormTimePicker
                    name={`${name}.openedFrom`}
                    label={t("openedFromLabel")}
                    placeholder={t("openedFromPlaceholder")}
                    handleBlur={value => {
                      updateOpenPeriod({
                        ...fields.value[index],
                        openedFrom: value
                      });
                    }}
                  />
                </Box>
                <Box width="calc(50% - 48px)" px={2}>
                  <FormTimePicker
                    name={`${name}.openedTo`}
                    label={t("openedToLabel")}
                    placeholder={t("openedToPlaceholder")}
                    handleBlur={value => {
                      updateOpenPeriod({
                        ...fields.value[index],
                        openedTo: value
                      });
                    }}
                  />
                </Box>
                <Actions key={name}>
                  <ActionIcon
                    size="sm"
                    icon={["fa", "minus"]}
                    red
                    onClick={() => {
                      removeOpenPeriod(fields.value[index].id);
                      fields.remove(index);
                    }}
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

Day.propTypes = {
  t: func.isRequired,
  addOpenPeriod: func.isRequired,
  updateOpenPeriod: func.isRequired,
  removeOpenPeriod: func.isRequired,
  weekday: number.isRequired
};

export default Day;
