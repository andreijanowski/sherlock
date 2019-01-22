import { PureComponent } from "react";
import withI18next from "lib/withI18next";
import loadTranslations from "utils/loadTranslations";
import { func, string } from "prop-types";
import { SingleActionView, BlueText, BoldText } from "components";
import { DesciprtionWrapper, InviteManagers } from "sections/addManager";

const namespaces = ["addManager", "forms"];

class addManager extends PureComponent {
  static async getInitialProps({ ctx }) {
    const pageProps = loadTranslations(ctx, namespaces);

    return {
      ...pageProps
    };
  }

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
        <InviteManagers {...{ t }} />
      </SingleActionView>
    );
  }
}

addManager.propTypes = {
  t: func.isRequired,
  lng: string.isRequired
};

export default withI18next(namespaces)(addManager);
