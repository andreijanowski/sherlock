import { PureComponent } from "react";
import { withNamespaces } from "i18n";
import requireAuth from "lib/requireAuth";
import { func, string, shape } from "prop-types";
import { SingleActionView } from "components";
import CreateAccount from "sections/register/CreateAccount";

const namespaces = ["register", "forms"];

class Register extends PureComponent {
  static async getInitialProps() {
    return {
      namespacesRequired: namespaces
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

export default requireAuth(false)(withNamespaces(namespaces)(Register));
