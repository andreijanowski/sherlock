import { PureComponent } from "react";
import { withNamespaces } from "i18n";
import { func, string, shape } from "prop-types";
import { SingleActionView, LoadingIndicator } from "components";
import { connect } from "react-redux";
import { deleteByToken as deleteByTokenAction } from "actions/auth";
import RemovalStatusMessage from "sections/deleteByToken/RemovalStatusMessage";

const namespaces = ["deleteByToken"];

class DeleteByToken extends PureComponent {
  static async getInitialProps() {
    return {
      namespacesRequired: namespaces
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
      deleteByToken
    } = this.props;
    deleteByToken(token)
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
          actionTitle: t("title"),
          actionDescription: t("description")
        }}
      >
        {isPending ? (
          <LoadingIndicator hasTransparentBackground />
        ) : (
          <RemovalStatusMessage {...{ t, lng, isSucceed, errorMessage }} />
        )}
      </SingleActionView>
    );
  }
}

DeleteByToken.propTypes = {
  t: func.isRequired,
  lng: string.isRequired,
  query: shape().isRequired,
  deleteByToken: func.isRequired
};

export default withNamespaces(namespaces)(
  connect(
    null,
    {
      deleteByToken: deleteByTokenAction
    }
  )(DeleteByToken)
);
