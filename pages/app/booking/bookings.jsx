import { PureComponent } from "react";
import { withNamespaces } from "i18n";
import requireAuth from "lib/requireAuth";
import { func, string, shape } from "prop-types";
import BookingLayout from "sections/booking/Layout";
import { connect } from "react-redux";
import { setCurrentBusiness } from "actions/app";
import { parseBookings } from "sections/booking/utils";
import Bookings from "sections/booking/bookings";

const namespaces = ["booking", "app", "forms"];

class BookingsPage extends PureComponent {
  static async getInitialProps() {
    return {
      namespacesRequired: namespaces
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      columns: parseBookings(props.bookings, props.t)
    };
  }

  componentDidUpdate(prevProps) {
    const { bookings } = this.props;
    const { bookings: prevBookings } = prevProps;
    if (bookings !== prevBookings) {
      this.refreshColumnsContent();
    }
  }

  refreshColumnsContent = () => {
    const { bookings, t } = this.props;
    this.setState({
      columns: parseBookings(bookings, t)
    });
  };

  render() {
    const {
      t,
      lng,
      business,
      businessId,
      businesses,
      changeCurrentBusiness
    } = this.props;

    const { columns } = this.state;

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
  businessId: string,
  changeCurrentBusiness: func.isRequired
};

BookingsPage.defaultProps = {
  business: null,
  businessId: "",
  businesses: null,
  bookings: null
};

export default requireAuth(true)(
  withNamespaces(namespaces)(
    connect(
      state => {
        const businessData = state.getIn(["users", "currentBusiness", "data"]);
        const business = businessData && businessData.get("businesses").first();

        return {
          business: business && business.get("attributes"),
          businessId: business && business.get("id"),
          businesses: state.getIn([
            "users",
            "profileBusinesses",
            "data",
            "businesses"
          ])
        };
      },
      {
        changeCurrentBusiness: setCurrentBusiness
      }
    )(BookingsPage)
  )
);
