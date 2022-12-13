import { PureComponent } from "react";
import { shape, string, arrayOf } from "prop-types";
import moment from "moment";
import Calendar from "react-big-calendar";
import { Wrapper } from "./styled";
import Month from "./Month";
import { CalendarWrapper } from "../styled";
import Toolbar from "../Toolbar";
import { getDefaultDate } from "../utils";

export default class YearCalendar extends PureComponent {
  constructor() {
    super();
    this.state = {
      date: moment(getDefaultDate())
    };
  }

  getMonthRange = () => {
    const { events } = this.props;
    const { date } = this.state;
    const startDate = moment(date).startOf("year");
    const endDate = moment(date).endOf("year");
    const focus = this.moment(startDate).startOf("month");
    const start = this.moment(startDate);
    const end = this.moment(endDate);
    const size = end.diff(start, "month") + 1;

    return Array(size)
      .fill(0)
      .map((n, i) => {
        const d = focus.clone().add(n + i, "months");
        const monthEvents = events.filter(e =>
          moment(e.start).isBetween(
            moment(d).startOf("month"),
            moment(d).endOf("month")
          )
        );
        return { d, events: monthEvents };
      });
  };

  onNavigate = direction => {
    const { date } = this.state;
    if (direction === Calendar.Navigate.PREVIOUS) {
      this.setState({ date: moment(date).subtract(1, "year") });
    } else if (direction === Calendar.Navigate.NEXT) {
      this.setState({ date: moment(date).add(1, "year") });
    }
  };

  moment = date => {
    const { locale } = this.props;
    const localMoment = moment(date);
    localMoment.locale(locale);

    return localMoment;
  };

  render() {
    const { lng } = this.props;
    const { date } = this.state;
    return (
      <CalendarWrapper>
        <Toolbar
          onNavigate={this.onNavigate}
          label={moment(date).startOf("year").format("YYYY")}
        />
        <Wrapper>
          {this.getMonthRange().map(({ d, events }) => (
            <Month key={d.toString()} date={d} events={events} lng={lng} />
          ))}
        </Wrapper>
      </CalendarWrapper>
    );
  }
}

YearCalendar.propTypes = {
  events: arrayOf(shape()),
  lng: string.isRequired,
  locale: string
};

YearCalendar.defaultProps = {
  locale: "en",
  events: []
};
