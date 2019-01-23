import { PureComponent } from "react";
import withI18next from "lib/withI18next";
import loadTranslations from "utils/loadTranslations";
import { func } from "prop-types";
import AppLayout from "layout/App";
import Form from "sections/profile/picturesAndMenus";

const namespaces = ["picturesAndMenus", "app"];

class PicturesAndMenus extends PureComponent {
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

PicturesAndMenus.propTypes = {
  t: func.isRequired
};

export default withI18next(namespaces)(PicturesAndMenus);
