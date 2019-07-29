import { PureComponent } from "react";
import { withNamespaces } from "i18n";
import requireAuth from "lib/requireAuth";
import { func, string, shape } from "prop-types";
import BookingLayout from "sections/booking/Layout";
import { connect } from "react-redux";
import { setCurrentBusiness } from "actions/app";
import {
  parseBookings,
  prepareTimelineSlots,
  getSlotClosestToPresent,
  getSlotFromMoment
} from "sections/booking/utils";
import Bookings from "sections/booking/bookings";
import BookingDetails from "sections/booking/bookings/BookingDetails";
import moment from "moment";
import { SliderStyles } from "components";
import { action as toggleMenu } from "redux-burger-menu/immutable";

const namespaces = ["booking", "app", "forms"];

class BookingsPage extends PureComponent {
  static async getInitialProps() {
    return {
      namespacesRequired: namespaces
    };
  }

  constructor(props) {
    super(props);
    const { bookings, tables, openPeriods, t } = props;
    const choosenDate = moment();
    const slotDuration = 30;
    const slots = openPeriods
      ? prepareTimelineSlots({ openPeriods, choosenDate, slotDuration })
      : [];

    this.state = {
      columns: parseBookings(bookings, tables, t),
      choosenDate,
      slots,
      choosenSlot: getSlotClosestToPresent(slots),
      slotDuration,
      draggableId: undefined,
      bookingDetailsId: undefined
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { bookings, tables, openPeriods } = this.props;
    const {
      bookings: prevBookings,
      tables: prevTables,
      openPeriods: prevOpenPeriods
    } = prevProps;
    const { choosenDate, slotDuration } = this.state;
    const {
      choosenDate: prevChoosenDate,
      slotDuration: prevSlotDuration
    } = prevState;
    if (bookings !== prevBookings || tables !== prevTables) {
      this.refreshColumnsContent();
    }
    if (
      openPeriods !== prevOpenPeriods ||
      choosenDate !== prevChoosenDate ||
      slotDuration !== prevSlotDuration
    ) {
      this.refreshPeriods();
    }
  }

  refreshColumnsContent = () => {
    const { bookings, tables, t } = this.props;
    this.setState({
      columns: parseBookings(bookings, tables, t)
    });
  };

  refreshPeriods = () => {
    const { openPeriods, bookings } = this.props;
    const { choosenDate, slotDuration, draggableId } = this.state;
    const slots = openPeriods
      ? prepareTimelineSlots({ openPeriods, choosenDate, slotDuration })
      : [];
    const bookingFrom =
      bookings && bookings.getIn([draggableId, "attributes", "from"]);
    const choosenSlot = bookingFrom
      ? getSlotFromMoment(slots, bookingFrom)
      : getSlotClosestToPresent(slots);
    this.setState({
      slots,
      choosenSlot
    });
  };

  handleDragStart = ({ draggableId }) => {
    const { bookings } = this.props;
    const bookingDate =
      bookings && bookings.getIn([draggableId, "attributes", "date"]);
    this.setState({
      draggableId,
      choosenDate: moment(bookingDate)
    });
  };

  handleDragEnd = ({ destination, source, draggableId }) => {
    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      this.setState(state => ({
        draggableId: undefined,
        choosenSlot:
          state.choosenSlot !== undefined
            ? state.choosenSlot
            : getSlotClosestToPresent(state.slots)
      }));
      return;
    }

    this.setState(state => {
      const sourceColumn = state.columns[source.droppableId];
      const newSourceBookingIds = Array.from(sourceColumn.bookingIds);
      newSourceBookingIds.splice(source.index, 1);
      if (source.droppableId === destination.droppableId) {
        newSourceBookingIds.splice(destination.index, 0, draggableId);
        return {
          ...state,
          draggableId: undefined,
          choosenSlot:
            state.choosenSlot !== undefined
              ? state.choosenSlot
              : getSlotClosestToPresent(state.slots),
          columns: {
            ...state.columns,
            [sourceColumn.id]: {
              ...sourceColumn,
              bookingIds: newSourceBookingIds
            }
          }
        };
      }
      const destinationColumn = state.columns[destination.droppableId];
      const newDestinationBookingIds = Array.from(destinationColumn.bookingIds);
      newDestinationBookingIds.splice(destination.index, 0, draggableId);
      return {
        ...state,
        draggableId: undefined,
        choosenSlot:
          state.choosenSlot !== undefined
            ? state.choosenSlot
            : getSlotClosestToPresent(state.slots),
        columns: {
          ...state.columns,
          [sourceColumn.id]: {
            ...sourceColumn,
            bookingIds: newSourceBookingIds
          },
          [destinationColumn.id]: {
            ...destinationColumn,
            bookingIds: newDestinationBookingIds
          }
        }
      };
    });
  };

  handleToggleBookingDetails = bookingDetailsId => {
    const { toggleBookingDetails } = this.props;
    this.setState({ bookingDetailsId });
    toggleBookingDetails(!!bookingDetailsId);
  };

  chooseDate = choosenDate => this.setState({ choosenDate });

  chooseSlot = choosenSlot => this.setState({ choosenSlot });

  setSlotDuration = slotDuration => this.setState({ slotDuration });

  render() {
    const {
      t,
      lng,
      business,
      businessId,
      businesses,
      bookings,
      changeCurrentBusiness
    } = this.props;

    const {
      columns,
      choosenDate,
      slots,
      choosenSlot,
      slotDuration,
      bookingDetailsId
    } = this.state;

    const bookingDetails =
      bookingDetailsId && bookings ? bookings.get(bookingDetailsId) : null;

    return (
      <BookingLayout
        {...{
          t,
          lng,
          page: "bookings",
          currentBusinessId: businessId,
          business,
          businesses,
          changeCurrentBusiness,
          slotDuration,
          setSlotDuration: this.setSlotDuration
        }}
      >
        <Bookings
          {...{
            onDragEnd: this.handleDragEnd,
            onDragStart: this.handleDragStart,
            columns,
            bookings,
            slots,
            choosenDate,
            choosenSlot,
            handleCardClick: this.handleToggleBookingDetails,
            chooseDate: this.chooseDate,
            chooseSlot: this.chooseSlot,
            t
          }}
        />
        <SliderStyles />
        <div style={{ position: "absolute", left: 0, top: 0 }}>
          <BookingDetails
            {...{
              bookingDetails,
              t,
              updateBooking: this.updateBooking
            }}
          />
        </div>
      </BookingLayout>
    );
  }
}

BookingsPage.propTypes = {
  t: func.isRequired,
  lng: string.isRequired,
  business: shape(),
  businesses: shape(),
  bookings: shape(),
  tables: shape(),
  openPeriods: shape(),
  businessId: string,
  changeCurrentBusiness: func.isRequired,
  toggleBookingDetails: func.isRequired
};

BookingsPage.defaultProps = {
  business: null,
  businessId: "",
  businesses: null,
  bookings: null,
  tables: null,
  openPeriods: null
};

export default requireAuth(true)(
  withNamespaces(namespaces)(
    connect(
      state => {
        const businessData = state.getIn(["users", "currentBusiness", "data"]);
        const business = businessData && businessData.get("businesses").first();
        const bookings = state.getIn(["bookings", "data", "bookings"]);
        const tables = state.getIn(["tables", "data", "tables"]);

        return {
          business: business && business.get("attributes"),
          businessId: business && business.get("id"),
          openPeriods: businessData && businessData.get("openPeriods"),
          businesses: state.getIn([
            "users",
            "profileBusinesses",
            "data",
            "businesses"
          ]),
          bookings,
          tables: tables
            ? tables.sortBy(table => table.getIn(["attributes", "number"]))
            : tables
        };
      },
      {
        changeCurrentBusiness: setCurrentBusiness,
        toggleBookingDetails: toggleMenu
      }
    )(BookingsPage)
  )
);
