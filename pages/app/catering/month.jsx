import { PureComponent } from "react";
import withI18next from "lib/withI18next";
import requireAuth from "lib/requireAuth";
import loadTranslations from "utils/loadTranslations";
import { func, string, shape, arrayOf } from "prop-types";
import Month from "sections/catering/month";
import CateringLayout from "sections/catering/Layout";
import { connect } from "react-redux";
import { setCurrentBusiness } from "actions/users";

const namespaces = ["catering", "app"];

class MonthPage extends PureComponent {
  static async getInitialProps({ ctx }) {
    const pageProps = loadTranslations(ctx, namespaces);

    return {
      ...pageProps
    };
  }

  constructor(p) {
    super();
    this.state = {
      view: {
        value: "month",
        label: p.t("month")
      }
    };
  }

  render() {
    const { t, lng, business, businesses, changeCurrentBusiness } = this.props;
    const { view } = this.state;
    return (
      <CateringLayout
        {...{
          t,
          lng,
          view,
          business,
          businesses,
          changeCurrentBusiness
        }}
      >
        <Month {...{ t }} />
      </CateringLayout>
    );
  }
}

MonthPage.propTypes = {
  t: func.isRequired,
  lng: string.isRequired,
  business: shape(),
  changeCurrentBusiness: func.isRequired,
  businesses: arrayOf(shape())
};

MonthPage.defaultProps = {
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
    )(MonthPage)
  )
);
