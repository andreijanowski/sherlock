import { PureComponent } from "react";
import withI18next from "lib/withI18next";
import requireAuth from "lib/requireAuth";
import loadTranslations from "utils/loadTranslations";
import { func, string, shape } from "prop-types";
import { SingleActionView } from "components";
import CreateAccount from "sections/register/CreateAccount";

const namespaces = ["register", "forms"];

class Register extends PureComponent {
  static async getInitialProps({ ctx }) {
    const pageProps = loadTranslations(ctx, namespaces);

    return {
      ...pageProps
    };
  }

  render() {
    const { t, lng, query } = this.props;
    return (
      <SingleActionView
        {...{
          lng,
          actionTitle: t("title"),
          actionDescription: t("description")
        }}
      >
        <CreateAccount {...{ t, lng, query }} />
      </SingleActionView>
    );
  }
}

Register.propTypes = {
  t: func.isRequired,
  lng: string.isRequired,
  query: shape().isRequired
};

export default requireAuth(false)(withI18next(namespaces)(Register));
