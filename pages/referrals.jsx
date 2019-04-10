import { PureComponent } from "react";
import withI18next from "lib/withI18next";
import loadTranslations from "utils/loadTranslations";
import { func, string } from "prop-types";
import requireAuth from "lib/requireAuth";
import { SingleActionView, BlueText, BoldText } from "components";
import { DesciprtionWrapper, InviteManagers } from "sections/addManager";
import { postReferrals } from "actions/referrals";
import { connect } from "react-redux";

const namespaces = ["addManager", "forms"];

class AddManager extends PureComponent {
  static async getInitialProps({ ctx }) {
    const pageProps = loadTranslations(ctx, namespaces);

    return {
      ...pageProps
    };
  }

  addReferrals = emails => {
    const { addReferrals } = this.props;
    return addReferrals(emails);
  };

  render() {
    const { t, lng } = this.props;
    return (
      <SingleActionView
        {...{
          lng,
          actionTitle: t("title"),
          actionDescription: (
            <DesciprtionWrapper>
              {t("description")}
              <BlueText>
                <BoldText>{t("highlightedDescription")}</BoldText>
              </BlueText>
            </DesciprtionWrapper>
          )
        }}
      >
        <InviteManagers {...{ t, addReferrals: this.addReferrals }} />
      </SingleActionView>
    );
  }
}

AddManager.propTypes = {
  t: func.isRequired,
  lng: string.isRequired,
  addReferrals: func.isRequired
};

export default requireAuth(true)(
  withI18next(namespaces)(
    connect(
      null,
      { addReferrals: postReferrals }
    )(AddManager)
  )
);
