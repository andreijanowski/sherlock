import { PureComponent } from "react";
import withI18next from "lib/withI18next";
import requireAuth from "lib/requireAuth";
import loadTranslations from "utils/loadTranslations";
import { func, string, shape } from "prop-types";
import AppLayout from "layout/App";
import Form from "sections/profile/contactInformation";
import { connect } from "react-redux";
import { patchBusiness } from "actions/businesses";
import { getInitialValues } from "sections/profile/contactInformation/utils";

const namespaces = ["contactInformation", "app"];

class ContactInformation extends PureComponent {
  static async getInitialProps({ ctx }) {
    const pageProps = loadTranslations(ctx, namespaces);

    return {
      ...pageProps
    };
  }

  handleSubmit = async ({ email, phone, phoneCountry, website, instagram }) => {
    try {
      const { updateBusiness, slug } = this.props;
      const requestValues = {
        email,
        phone,
        phoneCountryPrefix:
          phoneCountry && phoneCountry.value
            ? phoneCountry.value.prefix
            : undefined,
        phoneCountryCode:
          phoneCountry && phoneCountry.value
            ? phoneCountry.value.code
            : undefined,
        website,
        instagram
      };
      return updateBusiness(slug, requestValues);
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
        <Form {...{ t, initialValues, handleSubmit: this.handleSubmit }} />
      </AppLayout>
    );
  }
}

ContactInformation.propTypes = {
  t: func.isRequired,
  lng: string.isRequired,
  slug: string.isRequired,
  updateBusiness: func.isRequired,
  business: shape()
};

ContactInformation.defaultProps = {
  business: null
};

export default requireAuth(true)(
  withI18next(namespaces)(
    connect(
      state => ({
        business: state.users.currentBusiness.data
      }),
      { updateBusiness: patchBusiness }
    )(ContactInformation)
  )
);
