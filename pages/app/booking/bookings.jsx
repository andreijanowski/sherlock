import { PureComponent } from "react";
import { withNamespaces } from "i18n";
import requireAuth from "lib/requireAuth";
import { func, string, shape } from "prop-types";
import BookingLayout from "sections/booking/Layout";
import { connect } from "react-redux";
import { setCurrentBusiness } from "actions/app";
import { parseBookings, prepareTimelineSlots } from "sections/booking/utils";
import Bookings from "sections/booking/bookings";
import moment from "moment";

const namespaces = ["booking", "app", "forms"];

class BookingsPage extends PureComponent {
  static async getInitialProps() {
    return {
      namespacesRequired: namespaces
    };
  }

  constructor(props) {
    super(props);
    const { bookings, openPeriods, t } = props;
    const choosenDate = moment();
    const slots = openPeriods
      ? prepareTimelineSlots({ openPeriods, choosenDate })
      : [];

    this.state = {
      columns: parseBookings(bookings, t),
      choosenDate,
      slots,
      choosenSlot: slots[0],
      slotDuration: 30
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { bookings, openPeriods } = this.props;
    const { bookings: prevBookings, openPeriods: prevOpenPeriods } = prevProps;
    const { choosenDate, slotDuration } = this.state;
    const {
      choosenDate: prevChoosenDate,
      slotDuration: prevSlotDuration
    } = prevState;
    if (bookings !== prevBookings) {
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
    const { bookings, t } = this.props;
    this.setState({
      columns: parseBookings(bookings, t)
    });
  };

  refreshPeriods = () => {
    const { openPeriods } = this.props;
    const { choosenDate, slotDuration } = this.state;
    const slots = openPeriods
      ? prepareTimelineSlots({ openPeriods, choosenDate, slotDuration })
      : [];
    this.setState({
      slots,
      choosenSlot: slots[0]
    });
  };

  handleDragEnd = ({ destination, source, draggableId }) => {
    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
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
      slotDuration
    } = this.state;

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
            chooseDate: this.chooseDate,
            chooseSlot: this.chooseSlot,
            t
          }}
        />
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
  openPeriods: shape(),
  businessId: string,
  changeCurrentBusiness: func.isRequired
};

BookingsPage.defaultProps = {
  business: null,
  businessId: "",
  businesses: null,
  bookings: null,
  openPeriods: null
};

export default requireAuth(true)(
  withNamespaces(namespaces)(
    connect(
      state => {
        const businessData = state.getIn(["users", "currentBusiness", "data"]);
        const business = businessData && businessData.get("businesses").first();
        const bookings = state.getIn(["bookings", "data", "bookings"]);

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
          bookings
        };
      },
      {
        changeCurrentBusiness: setCurrentBusiness
      }
    )(BookingsPage)
  )
);
