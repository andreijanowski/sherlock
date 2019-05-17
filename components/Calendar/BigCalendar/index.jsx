import { PureComponent } from "react";
import BigCalendar from "react-big-calendar";
import { func, shape, string } from "prop-types";
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

  componentDidUpdate(prevProps) {
    const { caterings: prevCaterings } = prevProps;
    const { caterings, currency, defaultView, timeZone, t } = this.props;
    const { event } = this.state;
    if (prevCaterings !== caterings && event) {
      const parsedCaterings = parseCaterings(
        caterings,
        currency,
        defaultView,
        timeZone,
        t
      );
      const updatedEvent = event.resource.id
        ? parsedCaterings.find(c => c.resource.id === event.resource.id)
        : parsedCaterings.find(c =>
            c.start ? c.start.getTime() === event.start.getTime() : false
          );
      this.setEvent(updatedEvent);
    }
  }

  setEvent = event => this.setState({ event });

  toggleModal = event =>
    this.setState(state => ({ event: state.event ? null : event }));

  render() {
    const {
      t,
      lng,
      caterings,
      addresses,
      currency,
      defaultView,
      timeZone,
      setEditedCatering,
      sendOffer
    } = this.props;
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
          events={parseCaterings({
            caterings,
            addresses,
            currency,
            defaultView,
            timeZone,
            t
          })}
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
              setEditedCatering,
              sendOffer,
              t,
              lng
            }}
          />
        )}
      </>
    );
  }
}

CustomBigCalendar.propTypes = {
  t: func.isRequired,
  lng: string.isRequired,
  setEditedCatering: func.isRequired,
  sendOffer: func.isRequired,
  defaultView: string.isRequired,
  timeZone: string.isRequired,
  currency: string,
  caterings: shape(),
  addresses: shape()
};

CustomBigCalendar.defaultProps = {
  caterings: null,
  addresses: null,
  currency: "EUR"
};

export default CustomBigCalendar;
