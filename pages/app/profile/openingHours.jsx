import { PureComponent } from "react";
import withI18next from "lib/withI18next";
import loadTranslations from "utils/loadTranslations";
import { func, string } from "prop-types";
import AppLayout from "layout/App";
import Form from "sections/profile/openingHours";

const namespaces = ["openingHours", "app"];

class OpeningHours extends PureComponent {
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

OpeningHours.propTypes = {
  t: func.isRequired,
  lng: string.isRequired,
  slug: string.isRequired
};

export default withI18next(namespaces)(OpeningHours);
