import { PureComponent } from "react";
import withI18next from "lib/withI18next";
import loadTranslations from "utils/loadTranslations";
import { func, string, shape } from "prop-types";
import {
  SingleActionView,
  LoadingIndicator,
  Paragraph,
  Link
} from "components";
import { connect } from "react-redux";
import { confirmMail as confirmMailAction } from "actions/auth";
import styled from "styled-components";

const ParagraphStyled = styled(Paragraph)`
  margin: 0;
  text-align: center;
`;

const ToLogin = styled(Paragraph)`
  margin-top: 8px;
  margin-bottom: 0;
  cursor: pointer;
  text-align: center;

  :hover {
    color: rgb(${p => p.theme.colors.dark});
  }
`;

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

  renderConfirmationStatusMessage = () => {
    const { t, lng } = this.props;
    const { isSucceed, errorMessage } = this.state;
    return isSucceed ? (
      <>
        <ParagraphStyled>{t("succeedConfirmation")}</ParagraphStyled>
        <Link {...{ lng, route: "/login" }}>
          <ToLogin>{t("toLoginPage")}</ToLogin>
        </Link>
      </>
    ) : (
      <ParagraphStyled>
        {t(`failedConfirmation-${errorMessage}`)}
      </ParagraphStyled>
    );
  };

  render() {
    const { t, lng } = this.props;
    const { isPending } = this.state;
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
          this.renderConfirmationStatusMessage()
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
