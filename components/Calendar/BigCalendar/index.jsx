import { PureComponent } from "react";
import BigCalendar from "react-big-calendar";
import { func, arrayOf, shape, string } from "prop-types";
import { CalendarEvent, CalendarToolbar } from "components";
import moment from "moment-timezone";
import CalendarStyles from "./calendarStyles";
import { parseCaterings } from "../utils";
import EventModal from "../Event/EventModal";

const localizer = BigCalendar.momentLocalizer(moment);

class CustomBigCalendar extends PureComponent {
  state = {
    event: null
  };

  toggleModal = event =>
    this.setState(state => ({ event: state.event ? null : event }));

  render() {
    const { t, caterings, currency, defaultView, timeZone } = this.props;
    const { event } = this.state;
    return (
      <>
        <CalendarStyles />
        <BigCalendar
          localizer={localizer}
          components={{
            event: p => <CalendarEvent {...p} />,
            toolbar: CalendarToolbar
          }}
          onSelectEvent={this.toggleModal}
          onDrillDown={
            () => null /* TODO: After MVP add navigation between views */
          }
          defaultView={defaultView}
          showMultiDayTimes={false}
          events={parseCaterings(caterings, currency, defaultView, timeZone, t)}
          startAccessor="start"
          endAccessor="end"
          step={60}
          timeslots={1}
        />
        {event && (
          <EventModal
            {...{
              isOpen: true,
              onClose: this.toggleModal,
              event,
              t
            }}
          />
        )}
      </>
    );
  }
}

CustomBigCalendar.propTypes = {
  t: func.isRequired,
  defaultView: string.isRequired,
  timeZone: string.isRequired,
  currency: string,
  caterings: arrayOf(shape())
};

CustomBigCalendar.defaultProps = {
  caterings: null,
  currency: "EUR"
};

export default CustomBigCalendar;
