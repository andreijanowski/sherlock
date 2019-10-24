import { PureComponent } from "react";
import { withTranslation } from "i18n";
import { func, string, shape } from "prop-types";
import { SingleActionView, LoadingIndicator } from "components";
import { connect } from "react-redux";
import { acceptInvitation as acceptInvitationAction } from "actions/auth";
import AcceptInvitationStatusMessage from "sections/acceptInvitation/AcceptInvitationStatusMessage";
import AcceptInvitationForm from "sections/acceptInvitation/AcceptInvitationForm";

const namespaces = ["acceptInvitation", "form"];

class AcceptInvitation extends PureComponent {
  static async getInitialProps() {
    return {
      namespacesRequired: namespaces
    };
  }

  state = {
    isPending: false,
    isSucceed: null,
    errorMessage: null
  };

  onSubmit = values => {
    const {
      query: { token },
      acceptInvitation
    } = this.props;
    this.setState({ isPending: true });
    acceptInvitation({ ...values, authToken: token })
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
  };

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
        {!(isSucceed || errorMessage) ? (
          <>
            {isPending ? (
              <LoadingIndicator hasTransparentBackground />
            ) : (
              <AcceptInvitationForm {...{ t, onSubmit: this.onSubmit }} />
            )}
          </>
        ) : (
          <AcceptInvitationStatusMessage
            {...{ t, lng, isSucceed, errorMessage }}
          />
        )}
      </SingleActionView>
    );
  }
}

AcceptInvitation.propTypes = {
  t: func.isRequired,
  lng: string.isRequired,
  query: shape().isRequired,
  acceptInvitation: func.isRequired
};

export default withTranslation(namespaces)(
  connect(
    (state, { i18n }) => ({
      lng: (i18n && i18n.language) || "en"
    }),
    {
      acceptInvitation: acceptInvitationAction
    }
  )(AcceptInvitation)
);
