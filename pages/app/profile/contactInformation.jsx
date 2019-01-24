import { PureComponent } from "react";
import withI18next from "lib/withI18next";
import requireAuth from "lib/requireAuth";
import loadTranslations from "utils/loadTranslations";
import { func, string } from "prop-types";
import AppLayout from "layout/App";
import Form from "sections/profile/contactInformation";

const namespaces = ["contactInformation", "app"];

class ContactInformation extends PureComponent {
  static async getInitialProps({ ctx }) {
    const pageProps = loadTranslations(ctx, namespaces);

    return {
      ...pageProps
    };
  }

  render() {
    const { t, lng, slug } = this.props;
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
        <Form {...{ t }} />
      </AppLayout>
    );
  }
}

ContactInformation.propTypes = {
  t: func.isRequired,
  lng: string.isRequired,
  slug: string.isRequired
};

export default requireAuth(true)(withI18next(namespaces)(ContactInformation));
