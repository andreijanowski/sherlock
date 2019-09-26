import { PureComponent } from "react";
import { withNamespaces } from "i18n";
import requireAuth from "lib/requireAuth";
import { func, string, shape, bool } from "prop-types";
import Widgets from "sections/profile/widgets";
import { connect } from "react-redux";
import { postBusiness, patchBusiness } from "actions/businesses";
import { postWidget, patchWidget, deleteWidget } from "actions/widgets";
import { fetchProfileBusiness } from "actions/users";
import { setCurrentBusiness } from "actions/app";
import ProfileLayout from "sections/profile/Layout";

const namespaces = ["widgets", "app", "publishModal", "forms"];

class WidgetsPage extends PureComponent {
  static async getInitialProps() {
    return {
      namespacesRequired: namespaces
    };
  }

  state = { editedWidgetId: undefined };

  removeWidget = () => {};

  addWidget = values => {
    const { addWidget, updateWidget, businessId } = this.props;
    const { editedWidgetId } = this.state;

    const widgetValues = {
      ...values,
      domains: (values.domains || "").split(",")
    };

    if (editedWidgetId) {
      updateWidget(editedWidgetId, widgetValues);
    } else {
      addWidget(businessId, widgetValues);
    }
  };

  render() {
    const {
      t,
      lng,
      business,
      businessId,
      businessGroups,
      businessMenus,
      businessPictures,
      businessProducts,
      businessOpenPeriods,
      businesses,
      changeCurrentBusiness,
      addBusiness,
      updateBusiness,
      getProfileBusiness,
      widgets,
      loading
    } = this.props;

    const { editedWidgetId } = this.state;

    return (
      <ProfileLayout
        {...{
          t,
          lng,
          business,
          businessId,
          businessGroups,
          businessMenus,
          businessPictures,
          businessProducts,
          businessOpenPeriods,
          businesses,
          changeCurrentBusiness,
          addBusiness,
          updateBusiness,
          getProfileBusiness,
          currentPage: "widgets"
        }}
      >
        <Widgets
          {...{
            widgets,
            removeWidget: this.removeWidget,
            addWidget: this.addWidget,
            setEditedWidgetId: id => this.setState({ editedWidgetId: id }),
            editedWidgetId,
            t,
            loading
          }}
        />
      </ProfileLayout>
    );
  }
}

WidgetsPage.propTypes = {
  t: func.isRequired,
  lng: string.isRequired,
  updateBusiness: func.isRequired,
  business: shape(),
  businessId: string,
  businessGroups: shape(),
  businessMenus: shape(),
  businessPictures: shape(),
  businessProducts: shape(),
  businessOpenPeriods: shape(),
  changeCurrentBusiness: func.isRequired,
  getProfileBusiness: func.isRequired,
  addBusiness: func.isRequired,
  addWidget: func.isRequired,
  updateWidget: func.isRequired,
  businesses: shape(),
  widgets: shape(),
  loading: bool.isRequired
};

WidgetsPage.defaultProps = {
  business: null,
  businessId: "",
  businessGroups: null,
  businessMenus: null,
  businessPictures: null,
  businessProducts: null,
  businessOpenPeriods: null,
  businesses: null,
  widgets: null
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
          businessGroups: businessData && businessData.get("groups"),
          businessMenus: businessData && businessData.get("menus"),
          businessPictures: businessData && businessData.get("pictures"),
          businessProducts: businessData && businessData.get("products"),
          businessOpenPeriods: businessData && businessData.get("openPeriods"),
          businesses: state.getIn([
            "users",
            "profileBusinesses",
            "data",
            "businesses"
          ]),
          loading:
            (!state.getIn(["widgets", "isFailed"]) &&
              !state.getIn(["widgets", "isSucceeded"])) ||
            state.getIn(["widgets", "isFetching"]),
          widgets: state.getIn(["widgets", "data", "widgets"])
        };
      },
      {
        addBusiness: postBusiness,
        updateBusiness: patchBusiness,
        changeCurrentBusiness: setCurrentBusiness,
        getProfileBusiness: fetchProfileBusiness,
        addWidget: postWidget,
        updateWidget: patchWidget,
        removeWidget: deleteWidget
      }
    )(WidgetsPage)
  )
);
