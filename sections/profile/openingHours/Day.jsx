import { RawCheckbox, ActionIcon, FormTimePicker } from "components";
import { Flex, Box } from "@rebass/grid";
import { FieldArray } from "react-final-form-arrays";
import { func, number } from "prop-types";
import { Actions } from "../styled";
import { Copy, Line } from "./styled";

const Day = ({ t, weekday }) => (
  <FieldArray name={`day-${weekday}`}>
    {({ fields }) => (
      <>
        <Flex width={1} flexDirection={["column", "row"]}>
          <Box width={[1, 1 / 6]} mt="24px" mb="8px">
            <RawCheckbox
              label={t(`weekdays.${weekday}`)}
              input={{
                onClick: () => {
                  if (fields.length) {
                    for (let i = 0; i < fields.length; i += 1) {
                      fields.remove(0);
                    }
                  } else {
                    fields.push({ openedFrom: "", openedTo: "" });
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
                  />
                </Box>
                <Box width="calc(50% - 48px)" px={2}>
                  <FormTimePicker
                    name={`${name}.openedTo`}
                    label={t("openedToLabel")}
                    placeholder={t("openedToPlaceholder")}
                  />
                </Box>
                <Actions key={name}>
                  <ActionIcon
                    size="sm"
                    icon={["fa", "minus"]}
                    red
                    onClick={() => fields.remove(index)}
                  />
                  {index === fields.length - 1 && (
                    <ActionIcon
                      size="sm"
                      icon={["fa", "plus"]}
                      onClick={() =>
                        fields.push({ openedFrom: "", openedTo: "" })
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
  weekday: number.isRequired
};

export default Day;
