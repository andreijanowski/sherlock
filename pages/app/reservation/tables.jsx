import { PureComponent } from "react";
import { withTranslation } from "i18n";
import requireAuth from "lib/requireAuth";
import { func, string, shape } from "prop-types";
import ReservationLayout from "sections/reservation/Layout";
import { connect } from "react-redux";
import { setCurrentBusiness } from "actions/app";
import Tables from "sections/reservation/tables";
import { postTable, patchTable, deleteTable } from "actions/tables";
import { patchBusiness } from "actions/businesses";

const namespaces = ["reservation", "app", "forms"];

class TablesPage extends PureComponent {
  static async getInitialProps() {
    return {
      namespacesRequired: namespaces
    };
  }

  state = {
    editedTableId: undefined
  };

  setEditedTableId = editedTableId => this.setState({ editedTableId });

  addTable = values => {
    const { editedTableId } = this.state;
    if (editedTableId) {
      const { updateTable } = this.props;
      updateTable(values, editedTableId);
      this.setEditedTableId(undefined);
    } else {
      const { createTable, businessId } = this.props;
      createTable(values, businessId);
    }
  };

  removeTable = tableId => {
    const { removeTable } = this.props;
    removeTable(tableId);
  };

  render() {
    const {
      t,
      lng,
      business,
      businessId,
      businesses,
      changeCurrentBusiness,
      tables,
      updateBusiness
    } = this.props;

    const { editedTableId } = this.state;

    return (
      <ReservationLayout
        {...{
          t,
          lng,
          page: "tables",
          currentBusinessId: businessId,
          business,
          tables,
          businesses,
          changeCurrentBusiness,
          updateBusiness
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
      </ReservationLayout>
    );
  }
}

TablesPage.propTypes = {
  t: func.isRequired,
  lng: string.isRequired,
  business: shape(),
  businesses: shape(),
  tables: shape(),
  businessId: string,
  changeCurrentBusiness: func.isRequired,
  createTable: func.isRequired,
  updateTable: func.isRequired,
  removeTable: func.isRequired,
  updateBusiness: func.isRequired
};

TablesPage.defaultProps = {
  business: null,
  businessId: "",
  businesses: null,
  tables: null
};

export default requireAuth(true)(
  withTranslation(namespaces)(
    connect(
      (state, { i18n }) => {
        const businessData = state.getIn(["users", "currentBusiness", "data"]);
        const business = businessData && businessData.get("businesses").first();
        const tables = state.getIn(["tables", "data", "tables"]);

        return {
          business: business && business.get("attributes"),
          businessId: business && business.get("id"),
          businesses: state.getIn([
            "users",
            "profileBusinesses",
            "data",
            "businesses"
          ]),
          tables: tables
            ? tables.sortBy(table => table.getIn(["attributes", "number"]))
            : tables,
          lng: (i18n && i18n.language) || "en"
        };
      },
      {
        changeCurrentBusiness: setCurrentBusiness,
        createTable: postTable,
        updateTable: patchTable,
        removeTable: deleteTable,
        updateBusiness: patchBusiness
      }
    )(TablesPage)
  )
);
