import { PureComponent } from "react";
import withI18next from "lib/withI18next";
import requireAuth from "lib/requireAuth";
import loadTranslations from "utils/loadTranslations";
import { func, string, shape, arrayOf } from "prop-types";
import CateringLayout from "sections/catering/Layout";
import Day from "sections/catering/day";
import { connect } from "react-redux";
import { setCurrentBusiness } from "actions/users";
import { setCateringForEditing } from "actions/caterings";
import isServer from "utils/isServer";

const namespaces = ["catering", "app"];

class DayPage extends PureComponent {
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
        value: "day",
        label: p.t("day")
      }
    };
  }

  render() {
    const {
      t,
      lng,
      business,
      businesses,
      changeCurrentBusiness,
      caterings,
      setEditedCatering
    } = this.props;
    const { view } = this.state;
    const { currency } = business || {};
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
        {!isServer && (
          <Day
            {...{
              t,
              lng,
              caterings,
              currency,
              setEditedCatering,
              timeZone: business && business.timezone
            }}
          />
        )}
      </CateringLayout>
    );
  }
}

DayPage.propTypes = {
  t: func.isRequired,
  setEditedCatering: func.isRequired,
  lng: string.isRequired,
  business: shape(),
  changeCurrentBusiness: func.isRequired,
  businesses: arrayOf(shape()),
  caterings: arrayOf(shape())
};

DayPage.defaultProps = {
  business: null,
  businesses: null,
  caterings: null
};

export default requireAuth(true)(
  withI18next(namespaces)(
    connect(
      state => ({
        business: state.users.currentBusiness.data,
        businesses: state.users.profileBusinesses.data,
        caterings: state.caterings.data
      }),
      {
        changeCurrentBusiness: setCurrentBusiness,
        setEditedCatering: setCateringForEditing
      }
    )(DayPage)
  )
);
