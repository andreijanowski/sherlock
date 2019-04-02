import { CalendarToolbar } from "components";
import Calendar from "components/Calendar/FullYear/Calendar";
import moment from "moment";
import { arrayOf, shape, string } from "prop-types";
import { parseCaterings } from "components/Calendar/utils";
import { CalendarWrapper } from "../styled";

const Year = ({ caterings, currency }) => (
  <CalendarWrapper>
    <CalendarToolbar
      label={moment()
        .startOf("year")
        .format("YYYY")}
    />
    <Calendar
      startDate={moment().startOf("year")}
      endDate={moment().endOf("year")}
      events={parseCaterings(caterings, currency, "year")}
    />
  </CalendarWrapper>
);

Year.propTypes = {
  caterings: arrayOf(shape()),
  currency: string
};

Year.defaultProps = {
  caterings: null,
  currency: "EUR"
};

export default Year;
