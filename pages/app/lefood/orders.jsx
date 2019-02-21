import { PureComponent } from "react";
import withI18next from "lib/withI18next";
import requireAuth from "lib/requireAuth";
import loadTranslations from "utils/loadTranslations";
import { func, string, shape, arrayOf } from "prop-types";
import CateringLayout from "sections/lefood/Layout";
import Orders from "sections/lefood/orders";
import { connect } from "react-redux";
import { setCurrentBusiness } from "actions/users";

const namespaces = ["catering", "app"];

class OrdersPage extends PureComponent {
  static async getInitialProps({ ctx }) {
    const pageProps = loadTranslations(ctx, namespaces);

    return {
      ...pageProps
    };
  }

  render() {
    const { t, lng, business, businesses, changeCurrentBusiness } = this.props;
    return (
      <CateringLayout
        {...{
          t,
          lng,
          business,
          businesses,
          changeCurrentBusiness
        }}
      >
        <Orders {...{ t }} />
      </CateringLayout>
    );
  }
}

OrdersPage.propTypes = {
  t: func.isRequired,
  lng: string.isRequired,
  business: shape(),
  changeCurrentBusiness: func.isRequired,
  businesses: arrayOf(shape())
};

OrdersPage.defaultProps = {
  business: null,
  businesses: null
};

export default requireAuth(true)(
  withI18next(namespaces)(
    connect(
      state => ({
        business: state.users.currentBusiness.data,
        businesses: state.users.profileBusinesses.data
      }),
      {
        changeCurrentBusiness: setCurrentBusiness
      }
    )(OrdersPage)
  )
);
