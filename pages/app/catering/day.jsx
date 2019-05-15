import { PureComponent } from "react";
import { withNamespaces } from "i18n";
import requireAuth from "lib/requireAuth";
import { func, string, shape, arrayOf } from "prop-types";
import CateringLayout from "sections/catering/Layout";
import Day from "sections/catering/day";
import { connect } from "react-redux";
import { setCurrentBusiness } from "actions/app";
import { setCateringForEditing, sendCateringOffer } from "actions/caterings";
import isServer from "utils/isServer";

const namespaces = ["catering", "app"];

class DayPage extends PureComponent {
  static async getInitialProps() {
    return {
      namespacesRequired: namespaces
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
          <Day
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

DayPage.propTypes = {
  t: func.isRequired,
  setEditedCatering: func.isRequired,
  sendOffer: func.isRequired,
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
  withNamespaces(namespaces)(
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
    )(DayPage)
  )
);
