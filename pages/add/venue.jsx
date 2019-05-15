import { PureComponent } from "react";
import { withNamespaces } from "i18n";
import { func, string } from "prop-types";
import { SingleActionView } from "components";
import VenueForm from "sections/addVenue/VenueForm";

const namespaces = ["addVenue", "forms"];

class addVenue extends PureComponent {
  static async getInitialProps() {
    return {
      namespacesRequired: namespaces
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

export default withNamespaces(namespaces)(addVenue);
