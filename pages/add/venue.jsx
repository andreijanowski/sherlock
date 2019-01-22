import { PureComponent } from "react";
import withI18next from "lib/withI18next";
import loadTranslations from "utils/loadTranslations";
import { func, string } from "prop-types";
import { SingleActionView } from "components";
import VenueForm from "sections/addVenue/VenueForm";

const namespaces = ["addVenue", "forms"];

class addVenue extends PureComponent {
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
          actionDescription: t("description")
        }}
      >
        <VenueForm {...{ t }} />
      </SingleActionView>
    );
  }
}

addVenue.propTypes = {
  t: func.isRequired,
  lng: string.isRequired
};

export default withI18next(namespaces)(addVenue);
