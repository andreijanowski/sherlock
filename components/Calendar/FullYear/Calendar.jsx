import { PureComponent } from "react";
import { shape, string, arrayOf } from "prop-types";
import moment from "moment";
import { Wrapper } from "./styled";
import Month from "./Month";

export default class Calendar extends PureComponent {
  getMonthRange() {
    const { startDate, endDate, events } = this.props;
    const focus = this.moment(startDate).startOf("month");
    const start = this.moment(startDate);
    const end = this.moment(endDate);
    const size = end.diff(start, "month") + 1;

    return Array(size)
      .fill(0)
      .map((n, i) => {
        const date = focus.clone().add(n + i, "months");
        const monthEvents = events.filter(e =>
          moment(e.start).isBetween(
            moment(date).startOf("month"),
            moment(date).endOf("month")
          )
        );
        return { date, events: monthEvents };
      });
  }

  moment(date) {
    const { locale } = this.props;
    const localMoment = moment(date);
    localMoment.locale(locale);

    return localMoment;
  }

  render() {
    return (
      <Wrapper>
        {this.getMonthRange().map(({ date, events }) => (
          <Month key={date.toString()} date={date} events={events} />
        ))}
      </Wrapper>
    );
  }
}

Calendar.propTypes = {
  startDate: shape().isRequired,
  endDate: shape().isRequired,
  events: arrayOf(shape()),
  locale: string
};

Calendar.defaultProps = {
  locale: "en",
  events: []
};
