import { PureComponent } from "react";
import { withNamespaces } from "i18n";
import requireAuth from "lib/requireAuth";
import { func, string, shape, bool } from "prop-types";
import BookingLayout from "sections/booking/Layout";
import { connect } from "react-redux";
import { setCurrentBusiness } from "actions/app";
import Tables from "sections/booking/tables";

const namespaces = ["booking", "app", "forms"];

class BookingsPage extends PureComponent {
  static async getInitialProps() {
    return {
      namespacesRequired: namespaces
    };
  }

  constructor() {
    super();

    this.state = {
      slotDuration: 30,
      editedTableId: undefined
    };
  }

  setSlotDuration = slotDuration => this.setState({ slotDuration });

  setEditedTableId = editedTableId => this.setState({ editedTableId });

  addTable = values => {
    const { editedTableId } = this.state;
    if (editedTableId) {
      console.log(
        "TODO: connect patch api enpoint here to update table",
        values
      );
      this.setEditedTableId(undefined);
    } else {
      console.log("TODO: connect post api enpoint here to add table", values);
    }
  };

  removeTable = tableId =>
    console.log(
      "TODO: connect delete api enpoint here to remove table",
      tableId
    );

  render() {
    const {
      t,
      lng,
      business,
      businessId,
      businesses,
      changeCurrentBusiness,
      tables
    } = this.props;

    const { slotDuration, editedTableId } = this.state;

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
        <Tables
          {...{
            t,
            tables,
            setEditedTableId: this.setEditedTableId,
            editedTableId,
            removeTable: this.removeTable,
            addTable: this.addTable
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
  tables: shape(),
  openPeriods: shape(),
  businessId: string,
  changeCurrentBusiness: func.isRequired,
  loading: bool.isRequired
};

BookingsPage.defaultProps = {
  business: null,
  businessId: "",
  businesses: null,
  tables: null,
  openPeriods: null
};

export default requireAuth(true)(
  withNamespaces(namespaces)(
    connect(
      state => {
        const businessData = state.getIn(["users", "currentBusiness", "data"]);
        const business = businessData && businessData.get("businesses").first();
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
          tables
        };
      },
      {
        changeCurrentBusiness: setCurrentBusiness
      }
    )(BookingsPage)
  )
);
