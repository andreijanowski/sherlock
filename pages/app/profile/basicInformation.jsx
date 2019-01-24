import { PureComponent } from "react";
import withI18next from "lib/withI18next";
import requireAuth from "lib/requireAuth";
import loadTranslations from "utils/loadTranslations";
import { func, string, shape } from "prop-types";
import AppLayout from "layout/App";
import Form from "sections/profile/basicInformation";
import { connect } from "react-redux";

const namespaces = ["basicInformation", "app"];

class BasicInformation extends PureComponent {
  static async getInitialProps({ ctx }) {
    const pageProps = loadTranslations(ctx, namespaces);

    return {
      ...pageProps
    };
  }

  render() {
    const { t, lng, slug, business } = this.props;
    let initialValues;
    if (business) {
      const {
        name,
        tagline,
        country,
        countryCode,
        region,
        regionCode,
        street,
        streetNumber,
        postCode,
        ownerRole,
        bio
      } = business;
      initialValues = {
        name,
        tagline,
        country: {
          label: country,
          value: countryCode
        },
        region: {
          label: region,
          value: regionCode
        },
        street,
        streetNumber,
        postCode,
        ownerRole,
        bio
      };
    }
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
            initialValues
          }}
        />
      </AppLayout>
    );
  }
}

BasicInformation.propTypes = {
  t: func.isRequired,
  lng: string.isRequired,
  slug: string.isRequired,
  business: shape().isRequired
};

export default requireAuth(true)(
  withI18next(namespaces)(
    connect(state => ({ business: state.users.currentBusiness.data }))(
      BasicInformation
    )
  )
);
