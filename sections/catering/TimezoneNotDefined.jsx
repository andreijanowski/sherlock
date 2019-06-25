import { func } from "prop-types";
import { Flex } from "@rebass/grid";
import { H2 } from "components";

const TimezoneNotDefined = ({ t }) => (
  <Flex justifyContent="center" pt={6} px={2}>
    <H2 textAlign="center">{t("timezoneNotDefined")}</H2>
  </Flex>
);

TimezoneNotDefined.propTypes = {
  t: func.isRequired
};

export default TimezoneNotDefined;
