import { PureComponent } from "react";
import withI18next from "lib/withI18next";
import requireAuth from "lib/requireAuth";
import loadTranslations from "utils/loadTranslations";
import { func, string, shape } from "prop-types";
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
      const { addOpenPeriod, slug } = this.props;
      return addOpenPeriod(slug, parseOpenPeriod(openPeriod));
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

  render() {
    const { t, lng, slug, business } = this.props;
    const initialValues = getInitialValues(business);
    return (
      <AppLayout
        {...{
          mainIcon: "profile",
          header: t("header"),
          t,
          lng,
          slug
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
  slug: string.isRequired,
  addOpenPeriod: func.isRequired,
  updateOpenPeriod: func.isRequired,
  removeOpenPeriod: func.isRequired,
  business: shape()
};

OpeningHours.defaultProps = {
  business: null
};

export default requireAuth(true)(
  withI18next(namespaces)(
    connect(
      state => ({
        business: state.users.currentBusiness.data
      }),
      {
        addOpenPeriod: postOpenPeriod,
        updateOpenPeriod: patchOpenPeriod,
        removeOpenPeriod: deleteOpenPeriod
      }
    )(OpeningHours)
  )
);
