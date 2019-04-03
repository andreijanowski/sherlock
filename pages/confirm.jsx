import { PureComponent } from "react";
import withI18next from "lib/withI18next";
import loadTranslations from "utils/loadTranslations";
import { func, string, shape } from "prop-types";
import { SingleActionView, LoadingIndicator } from "components";
import { connect } from "react-redux";
import { confirmMail as confirmMailAction } from "actions/auth";
import ConfirmationStatusMessage from "sections/confirm/ConfirmationStatusMessage";

const namespaces = ["confirm"];

class ConfirmAccount extends PureComponent {
  static async getInitialProps({ ctx }) {
    const pageProps = loadTranslations(ctx, namespaces);

    return {
      ...pageProps
    };
  }

  state = {
    isPending: true,
    isSucceed: null,
    errorMessage: null
  };

  componentDidMount() {
    const {
      query: { token },
      confirmMail
    } = this.props;
    confirmMail(token)
      .then(() => {
        this.setState({ isSucceed: true });
      })
      .catch(e => {
        this.setState({
          isSucceed: false,
          errorMessage: e.response.data.errors[0].code
        });
      })
      .finally(() => {
        this.setState({ isPending: false });
      });
  }

  render() {
    const { t, lng } = this.props;
    const { isPending, isSucceed, errorMessage } = this.state;
    return (
      <SingleActionView
        {...{
          lng,
          actionTitle: t("title")
        }}
      >
        {isPending ? (
          <LoadingIndicator hasTransparentBackground />
        ) : (
          <ConfirmationStatusMessage {...{ t, lng, isSucceed, errorMessage }} />
        )}
      </SingleActionView>
    );
  }
}

ConfirmAccount.propTypes = {
  t: func.isRequired,
  lng: string.isRequired,
  query: shape().isRequired,
  confirmMail: func.isRequired
};

export default withI18next(namespaces)(
  connect(
    null,
    {
      confirmMail: confirmMailAction
    }
  )(ConfirmAccount)
);