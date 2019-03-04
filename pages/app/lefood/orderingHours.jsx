import { PureComponent } from "react";
import withI18next from "lib/withI18next";
import requireAuth from "lib/requireAuth";
import loadTranslations from "utils/loadTranslations";
import { func, string, arrayOf, shape, bool } from "prop-types";
import LefoodLayout from "sections/lefood/Layout";
import { Periods, parsePeriods, parsePeriod } from "components";
import { connect } from "react-redux";
import {
  postOrderPeriod,
  patchOrderPeriod,
  deleteOrderPeriod
} from "actions/orderPeriods";

const namespaces = ["lefood", "app", "forms"];

class OrderingHoursPage extends PureComponent {
  static async getInitialProps({ ctx }) {
    const pageProps = loadTranslations(ctx, namespaces);

    return {
      ...pageProps
    };
  }

  state = {
    copied: undefined
  };

  addOrderPeriod = orderPeriod => {
    const {
      addOrderPeriod,
      business: { id }
    } = this.props;
    return addOrderPeriod(id, parsePeriod(orderPeriod));
  };

  updateOrderPeriod = orderPeriod => {
    const { updateOrderPeriod } = this.props;
    return updateOrderPeriod(orderPeriod.id, parsePeriod(orderPeriod));
  };

  removeOrderPeriod = id => {
    const { removeOrderPeriod } = this.props;
    return removeOrderPeriod(id);
  };

  copy = fields => this.setState({ copied: fields });

  paste = weekday => {
    const { copied } = this.state;
    if (copied && copied.length) {
      copied.forEach(async c => {
        this.addOrderPeriod({ ...c, weekday });
      });
    }
    return null;
  };

  render() {
    const { t, lng, business } = this.props;

    const initialValues = business
      ? parsePeriods(business.orderPeriods)
      : undefined;

    return (
      <LefoodLayout
        {...{
          t,
          lng,
          page: "orderingHours"
        }}
      >
        <Periods
          {...{
            t,
            initialValues,
            addPeriod: this.addOrderPeriod,
            updatePeriod: this.updateOrderPeriod,
            removePeriod: this.removeOrderPeriod,
            copy: this.copy,
            paste: this.paste
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
  loading: bool.isRequired,
  orderingHours: arrayOf(shape()).isRequired,
  addOrderPeriod: func.isRequired,
  updateOrderPeriod: func.isRequired,
  removeOrderPeriod: func.isRequired
};

OrderingHoursPage.defaultProps = {
  business: {}
};

export default requireAuth(true)(
  withI18next(namespaces)(
    connect(
      state => ({
        business: state.users.currentBusiness.data
      }),
      {
        addOrderPeriod: postOrderPeriod,
        updateOrderPeriod: patchOrderPeriod,
        removeOrderPeriod: deleteOrderPeriod
      }
    )(OrderingHoursPage)
  )
);
