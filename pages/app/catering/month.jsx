import { PureComponent } from "react";
import withI18next from "lib/withI18next";
import requireAuth from "lib/requireAuth";
import loadTranslations from "utils/loadTranslations";
import { func, string } from "prop-types";
import Month from "sections/catering/month";
import CateringLayout from "sections/catering/Layout";

const namespaces = ["catering", "app"];

class MonthPage extends PureComponent {
  static async getInitialProps({ ctx }) {
    const pageProps = loadTranslations(ctx, namespaces);

    return {
      ...pageProps
    };
  }

  render() {
    const { t, lng } = this.props;
    return (
      <CateringLayout
        {...{
          t,
          lng
        }}
      >
        <Month />
      </CateringLayout>
    );
  }
}

MonthPage.propTypes = {
  t: func.isRequired,
  lng: string.isRequired
};

export default requireAuth(true)(withI18next(namespaces)(MonthPage));
