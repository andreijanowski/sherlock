import { PureComponent } from "react";
import withI18next from "lib/withI18next";
import requireAuth from "lib/requireAuth";
import loadTranslations from "utils/loadTranslations";
import { func, string, shape, arrayOf } from "prop-types";
import AppLayout from "layout/App";
import Form from "sections/profile/openingHours";
import {
  getInitialValues,
  parseOpenPeriod
} from "sections/profile/openingHours/utils";
import { connect } from "react-redux";
import {
  postOpenPeriod,
  patchOpenPeriod,
  deleteOpenPeriod
} from "actions/openPeriods";
import {
  generateMenuItems,
  prepareBusinessesList
} from "sections/profile/utils";
import { setCurrentBusiness } from "actions/users";

const namespaces = ["openingHours", "app"];

class OpeningHours extends PureComponent {
  static async getInitialProps({ ctx }) {
    const pageProps = loadTranslations(ctx, namespaces);

    return {
      ...pageProps
    };
  }

  addOpenPeriod = async openPeriod => {
    try {
      const {
        addOpenPeriod,
        business: { id }
      } = this.props;
      return addOpenPeriod(id, parseOpenPeriod(openPeriod));
    } catch (e) {
      console.log(e);
      return e;
    }
  };

  updateOpenPeriod = async openPeriod => {
    try {
      const { updateOpenPeriod } = this.props;
      return updateOpenPeriod(openPeriod.id, parseOpenPeriod(openPeriod));
    } catch (e) {
      console.log(e);
      return e;
    }
  };

  removeOpenPeriod = async id => {
    try {
      const { removeOpenPeriod } = this.props;
      return removeOpenPeriod(id);
    } catch (e) {
      console.log(e);
      return e;
    }
  };

  handleBusinessChange = b => {
    const { changeCurrentBusiness } = this.props;
    changeCurrentBusiness(b.value);
  };

  render() {
    const { t, lng, business, businesses } = this.props;
    const initialValues = getInitialValues(business);
    const businessesList = prepareBusinessesList(businesses);

    return (
      <AppLayout
        {...{
          mainIcon: "profile",
          header: t("header"),
          t,
          lng,
          withMenu: true,
          menuItems: generateMenuItems(t, "openingHours"),
          select: {
            value: {
              value: business && business.id,
              label: business && business.name,
              src: business && business.logo.url
            },
            items: businessesList,
            handleChange: this.handleBusinessChange
          }
        }}
      >
        <Form
          {...{
            t,
            initialValues,
            addOpenPeriod: this.addOpenPeriod,
            updateOpenPeriod: this.updateOpenPeriod,
            removeOpenPeriod: this.removeOpenPeriod
          }}
        />
      </AppLayout>
    );
  }
}

OpeningHours.propTypes = {
  t: func.isRequired,
  lng: string.isRequired,
  addOpenPeriod: func.isRequired,
  updateOpenPeriod: func.isRequired,
  removeOpenPeriod: func.isRequired,
  business: shape(),
  changeCurrentBusiness: func.isRequired,
  businesses: arrayOf(shape())
};

OpeningHours.defaultProps = {
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
        addOpenPeriod: postOpenPeriod,
        updateOpenPeriod: patchOpenPeriod,
        removeOpenPeriod: deleteOpenPeriod,
        changeCurrentBusiness: setCurrentBusiness
      }
    )(OpeningHours)
  )
);
