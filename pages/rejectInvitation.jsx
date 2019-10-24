import { PureComponent } from "react";
import { withTranslation } from "i18n";
import { func, string, shape } from "prop-types";
import { SingleActionView, LoadingIndicator } from "components";
import { connect } from "react-redux";
import { rejectInvitation as rejectInvitationAction } from "actions/auth";
import RejectInvitationStatusMessage from "sections/rejectInvitation/RejectInvitationStatusMessage";

const namespaces = ["rejectInvitation"];

class RejectInvitation extends PureComponent {
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
      rejectInvitation
    } = this.props;
    rejectInvitation(token)
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
          <RejectInvitationStatusMessage
            {...{ t, lng, isSucceed, errorMessage }}
          />
        )}
      </SingleActionView>
    );
  }
}

RejectInvitation.propTypes = {
  t: func.isRequired,
  lng: string.isRequired,
  query: shape().isRequired,
  rejectInvitation: func.isRequired
};

export default withTranslation(namespaces)(
  connect(
    (state, { i18n }) => ({ lng: (i18n && i18n.language) || "en" }),
    {
      rejectInvitation: rejectInvitationAction
    }
  )(RejectInvitation)
);
