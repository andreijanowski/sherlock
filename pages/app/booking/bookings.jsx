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
    this.state = {
      columns: parseBookings(bookings, t),
      choosedDate: moment()
    };
    const { choosedDate } = this.state;
    this.state.slots = openPeriods
      ? prepareTimelineSlots({ openPeriods, choosedDate })
      : [];
  }

  componentDidUpdate(prevProps, prevState) {
    const { bookings, openPeriods } = this.props;
    const { bookings: prevBookings, openPeriods: prevOpenPeriods } = prevProps;
    const { choosedDate } = this.state;
    const { choosedDate: prevChoosedDate } = prevState;
    if (bookings !== prevBookings) {
      this.refreshColumnsContent();
    }
    if (openPeriods !== prevOpenPeriods || choosedDate !== prevChoosedDate) {
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
    const { choosedDate } = this.state;
    this.setState({
      slots: openPeriods
        ? prepareTimelineSlots({ openPeriods, choosedDate, slotDuration: 900 })
        : []
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

  setDate = choosedDate => this.setState({ choosedDate });

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

    const { columns, choosedDate, slots } = this.state;

    return (
      <BookingLayout
        {...{
          t,
          lng,
          page: "bookings",
          currentBusinessId: businessId,
          business,
          businesses,
          changeCurrentBusiness
        }}
      >
        <Bookings
          {...{
            onDragEnd: this.handleDragEnd,
            onDragStart: this.handleDragStart,
            columns,
            bookings,
            slots,
            choosedDate,
            changeDate: this.setDate,
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
