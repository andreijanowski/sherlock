import { PureComponent } from "react";
import { withTranslation } from "i18n";
import requireAuth from "lib/requireAuth";
import { func, string, shape, number } from "prop-types";
import LefoodLayout from "sections/lefood/Layout";
import { Periods, parsePeriods } from "components";
import { connect } from "react-redux";
import {
  postOrderPeriod,
  patchOrderPeriod,
  deleteOrderPeriod
} from "actions/orderPeriods";
import { setCurrentBusiness } from "actions/app";
import { patchBusiness } from "actions/businesses";

const namespaces = ["lefood", "app", "forms"];

class OrderingHoursPage extends PureComponent {
  static async getInitialProps() {
    return {
      namespacesRequired: namespaces
    };
  }

  addOrderPeriod = orderPeriod => {
    const { addOrderPeriod, businessId } = this.props;
    return addOrderPeriod(businessId, orderPeriod);
  };

  updateOrderPeriod = orderPeriod => {
    const { updateOrderPeriod } = this.props;
    return updateOrderPeriod(orderPeriod.id, orderPeriod);
  };

  removeOrderPeriod = id => {
    const { removeOrderPeriod } = this.props;
    return removeOrderPeriod(id);
  };

  render() {
    const {
      t,
      lng,
      updateBusiness,
      business,
      businessId,
      dishesLength,
      deliveriesLength,
      businessOrderPeriods,
      businessOrderPeriodsLength,
      businesses,
      changeCurrentBusiness
    } = this.props;

    const initialValues = parsePeriods(businessOrderPeriods);

    return (
      <LefoodLayout
        {...{
          t,
          lng,
          page: "orderingHours",
          updateBusiness,
          currentBusinessId: businessId,
          dishesLength,
          deliveriesLength,
          orderPeriodsLength: businessOrderPeriodsLength,
          business,
          businesses,
          changeCurrentBusiness
        }}
      >
        <Periods
          {...{
            t,
            initialValues,
            addPeriod: this.addOrderPeriod,
            updatePeriod: this.updateOrderPeriod,
            removePeriod: this.removeOrderPeriod,
            currentPage: "orderingHours"
          }}
        />
      </LefoodLayout>
    );
  }
}

OrderingHoursPage.propTypes = {
  t: func.isRequired,
  lng: string.isRequired,
  business: shape(),
  orderingHours: shape(),
  addOrderPeriod: func.isRequired,
  updateOrderPeriod: func.isRequired,
  removeOrderPeriod: func.isRequired,
  updateBusiness: func.isRequired,
  businesses: shape(),
  changeCurrentBusiness: func.isRequired,
  businessId: string,
  dishesLength: number,
  deliveriesLength: number,
  businessOrderPeriodsLength: number,
  businessOrderPeriods: shape()
};

OrderingHoursPage.defaultProps = {
  business: null,
  businesses: null,
  orderingHours: null,
  businessId: "",
  dishesLength: 0,
  deliveriesLength: 0,
  businessOrderPeriodsLength: 0,
  businessOrderPeriods: {}
};

export default requireAuth(true)(
  withTranslation(namespaces)(
    connect(
      (state, { i18n }) => {
        const businessData = state.getIn(["users", "currentBusiness", "data"]);
        const business =
          businessData &&
          businessData.get("businesses") &&
          businessData.get("businesses").first();
        const businessOrderPeriods =
          businessData && businessData.get("orderPeriods");
        const dishes = state.getIn(["dishes", "data", "dishes"]);
        const deliveries = state.getIn(["deliveries", "data", "deliveries"]);
        return {
          loading:
            (!state.getIn(["deliveries", "isFailed"]) &&
              !state.getIn(["deliveries", "isSucceeded"])) ||
            state.getIn(["deliveries", "isFetching"]),
          deliveriesLength: deliveries && deliveries.size,
          dishesLength: dishes && dishes.size,
          business: business && business.get("attributes"),
          businessId: business && business.get("id"),
          businessOrderPeriods,
          businessOrderPeriodsLength:
            businessOrderPeriods && businessOrderPeriods.size,
          businesses: state.getIn([
            "users",
            "profileBusinesses",
            "data",
            "businesses"
          ]),
          lng: (i18n && i18n.language) || "en"
        };
      },
      {
        addOrderPeriod: postOrderPeriod,
        updateOrderPeriod: patchOrderPeriod,
        removeOrderPeriod: deleteOrderPeriod,
        updateBusiness: patchBusiness,
        changeCurrentBusiness: setCurrentBusiness
      }
    )(OrderingHoursPage)
  )
);
