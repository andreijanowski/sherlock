import { PureComponent } from "react";
import withI18next from "lib/withI18next";
import loadTranslations from "utils/loadTranslations";
import { func } from "prop-types";
import { Flex } from "@rebass/grid";

const namespaces = ["index"];

class Home extends PureComponent {
  static async getInitialProps({ ctx }) {
    const pageProps = loadTranslations(ctx, namespaces);

    return {
      ...pageProps
    };
  }

  render() {
    const { t } = this.props;
    return <Flex>{t("message")}</Flex>;
  }
}

Home.propTypes = {
  t: func.isRequired
};

export default withI18next(namespaces)(Home);
