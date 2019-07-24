import { PureComponent } from "react";
import { withNamespaces } from "i18n";
import requireAuth from "lib/requireAuth";
import { func, string, shape } from "prop-types";
import BookingLayout from "sections/booking/Layout";
import { connect } from "react-redux";
import { setCurrentBusiness } from "actions/app";
import Form from "sections/booking/create";

const namespaces = ["booking", "app", "forms"];

class CreateBookingPage extends PureComponent {
  static async getInitialProps() {
    return {
      namespacesRequired: namespaces
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      slotDuration: 30
    };
  }

  setSlotDuration = slotDuration => this.setState({ slotDuration });

  render() {
    const {
      t,
      lng,
      business,
      businessId,
      businesses,
      changeCurrentBusiness
    } = this.props;

    const { slotDuration } = this.state;

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
        <Form {...{ t, lng, isSending: false, handleFormSubmit: () => null }} />
      </BookingLayout>
    );
  }
}

CreateBookingPage.propTypes = {
  t: func.isRequired,
  lng: string.isRequired,
  business: shape(),
  businesses: shape(),
  businessId: string,
  changeCurrentBusiness: func.isRequired
};

CreateBookingPage.defaultProps = {
  business: null,
  businessId: "",
  businesses: null
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
    )(CreateBookingPage)
  )
);
