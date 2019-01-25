import { PureComponent } from "react";
import withI18next from "lib/withI18next";
import requireAuth from "lib/requireAuth";
import loadTranslations from "utils/loadTranslations";
import { func, string, shape } from "prop-types";
import AppLayout from "layout/App";
import Form from "sections/profile/picturesAndMenus";
import { connect } from "react-redux";
import { patchBusiness } from "actions/businesses";
import { getInitialValues } from "sections/profile/picturesAndMenus/utils";

const namespaces = ["picturesAndMenus", "app"];

class PicturesAndMenus extends PureComponent {
  static async getInitialProps({ ctx }) {
    const pageProps = loadTranslations(ctx, namespaces);

    return {
      ...pageProps
    };
  }

  saveLogo = async logo => {
    try {
      const { updateBusiness, slug } = this.props;
      return updateBusiness(slug, { logo });
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
        <Form {...{ t, initialValues, saveLogo: this.saveLogo }} />
      </AppLayout>
    );
  }
}

PicturesAndMenus.propTypes = {
  t: func.isRequired,
  lng: string.isRequired,
  slug: string.isRequired,
  updateBusiness: func.isRequired,
  business: shape()
};

PicturesAndMenus.defaultProps = {
  business: null
};

export default requireAuth(true)(
  withI18next(namespaces)(
    connect(
      state => ({
        business: state.users.currentBusiness.data
      }),
      { updateBusiness: patchBusiness }
    )(PicturesAndMenus)
  )
);
