import { PureComponent } from "react";
import withI18next from "lib/withI18next";
import requireAuth from "lib/requireAuth";
import loadTranslations from "utils/loadTranslations";
import { func, string, arrayOf, shape, bool } from "prop-types";
import LefoodLayout from "sections/lefood/Layout";
import Delivery from "sections/lefood/delivery";
import { connect } from "react-redux";
import { postDelivery, deleteDelivery } from "actions/deliveries";
import { convertToCents } from "utils/price";

const namespaces = ["lefood", "app", "forms"];

class DeliveriesPage extends PureComponent {
  static async getInitialProps({ ctx }) {
    const pageProps = loadTranslations(ctx, namespaces);

    return {
      ...pageProps
    };
  }

  addDelivery = values => {
    const {
      addDelivery,
      currentBusiness: { id, countryCode }
    } = this.props;
    return addDelivery(
      {
        ...values,
        code: `${countryCode}-${values.code}`,
        priceCents: convertToCents(values.priceCents)
      },
      id
    );
  };

  removeDelivery = id => {
    const { removeDelivery } = this.props;
    removeDelivery(id);
  };

  render() {
    const { t, lng, deliveries, loading } = this.props;
    return (
      <LefoodLayout
        {...{
          t,
          lng,
          page: "deliveryArea"
        }}
      >
        <Delivery
          {...{
            t,
            deliveries,
            loading,
            addDelivery: this.addDelivery,
            removeDelivery: this.removeDelivery
          }}
        />
      </LefoodLayout>
    );
  }
}

DeliveriesPage.propTypes = {
  t: func.isRequired,
  lng: string.isRequired,
  deliveries: arrayOf(shape()).isRequired,
  currentBusiness: shape(),
  addDelivery: func.isRequired,
  removeDelivery: func.isRequired,
  loading: bool.isRequired
};

DeliveriesPage.defaultProps = {
  currentBusiness: {}
};

export default requireAuth(true)(
  withI18next(namespaces)(
    connect(
      state => ({
        loading:
          (!state.deliveries.isFailed && !state.deliveries.isSucceeded) ||
          state.deliveries.isFetching,
        deliveries: state.deliveries.data,
        currentBusiness: state.users.currentBusiness.data
      }),
      {
        addDelivery: postDelivery,
        removeDelivery: deleteDelivery
      }
    )(DeliveriesPage)
  )
);
