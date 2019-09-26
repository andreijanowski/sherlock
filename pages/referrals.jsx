import { PureComponent } from "react";
import { withTranslation } from "i18n";
import { func, string, shape } from "prop-types";
import requireAuth from "lib/requireAuth";
import { SingleActionView, BlueText, BoldText } from "components";
import { DesciprtionWrapper, InviteManagers } from "sections/addManager";
import { postReferrals } from "actions/referrals";
import { connect } from "react-redux";
import { Router } from "routes";

const namespaces = ["addManager", "forms"];

class AddManager extends PureComponent {
  static async getInitialProps() {
    return {
      namespacesRequired: namespaces
    };
  }

  addReferrals = ({ emails = [] }) => {
    const { addReferrals, lng, query } = this.props;
    if (emails.length) {
      addReferrals(emails.map(e => e.email).filter(e => !!e))
        .then(() => {
          if (query.plan === "essential") {
            Router.pushRoute(`/${lng}/app/`);
          } else {
            Router.pushRoute(`/${lng}/app/subscriptions/`);
          }
        })
        .catch(e => console.log(e));
    } else if (query.plan === "essential") {
      Router.pushRoute(`/${lng}/app/`);
    } else {
      Router.pushRoute(`/${lng}/app/subscriptions/`);
    }
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
  addReferrals: func.isRequired,
  query: shape().isRequired
};

export default requireAuth(true)(
  withTranslation(namespaces)(
    connect(
      (state, { i18n }) => ({ lng: (i18n && i18n.language) || "en" }),
      { addReferrals: postReferrals }
    )(AddManager)
  )
);
