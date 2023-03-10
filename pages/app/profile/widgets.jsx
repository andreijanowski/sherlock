import { PureComponent } from "react";
import { withTranslation } from "i18n";
import requireAuth from "lib/requireAuth";
import { func, string, shape, bool } from "prop-types";
import Widgets from "sections/profile/widgets";
import RemoveModal from "sections/profile/widgets/RemoveModal";
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

  state = { editedWidgetId: undefined, widgetForRemoval: null };

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
      removeWidget,
      loading
    } = this.props;

    const { editedWidgetId, widgetForRemoval } = this.state;

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
            removeWidget: id => this.setState({ widgetForRemoval: id }),
            addWidget: this.addWidget,
            setEditedWidgetId: id => this.setState({ editedWidgetId: id }),
            editedWidgetId,
            t,
            loading
          }}
        />
        <RemoveModal
          {...{
            isOpen: !!widgetForRemoval,
            onClose: () => this.setState({ widgetForRemoval: null }),
            handleRemove: () => {
              removeWidget(widgetForRemoval);
              this.setState({ widgetForRemoval: null });
            },
            t
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
  removeWidget: func.isRequired,
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
  withTranslation(namespaces)(
    connect(
      (state, { i18n }) => {
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
          widgets: state.getIn(["widgets", "data", "widgets"]),
          lng: (i18n && i18n.language) || "en"
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
