import { PureComponent } from "react";
import withI18next from "lib/withI18next";
import requireAuth from "lib/requireAuth";
import loadTranslations from "utils/loadTranslations";
import { func, string, shape, arrayOf } from "prop-types";
import CateringLayout from "sections/catering/Layout";
import Week from "sections/catering/week";
import { connect } from "react-redux";
import { setCurrentBusiness } from "actions/app";
import { setCateringForEditing, sendCateringOffer } from "actions/caterings";
import isServer from "utils/isServer";

const namespaces = ["catering", "app"];

class WeekPage extends PureComponent {
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
        value: "week",
        label: p.t("week")
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
      setEditedCatering,
      sendOffer
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
          <Week
            {...{
              t,
              lng,
              caterings,
              currency,
              setEditedCatering,
              sendOffer,
              timeZone: business && business.timezone
            }}
          />
        )}
      </CateringLayout>
    );
  }
}

WeekPage.propTypes = {
  t: func.isRequired,
  setEditedCatering: func.isRequired,
  sendOffer: func.isRequired,
  lng: string.isRequired,
  business: shape(),
  changeCurrentBusiness: func.isRequired,
  businesses: arrayOf(shape()),
  caterings: arrayOf(shape())
};

WeekPage.defaultProps = {
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
        setEditedCatering: setCateringForEditing,
        sendOffer: sendCateringOffer
      }
    )(WeekPage)
  )
);
