import { withTranslation } from "i18n";
import { func, string, shape } from "prop-types";
import { SingleActionView } from "components";
import VenueForm from "sections/addVenue/VenueForm";

const namespaces = ["addVenue", "forms"];

const AddVenue = ({ t, i18n }) => (
  <SingleActionView
    {...{
      lng: (i18n && i18n.language) || "en",
      actionTitle: t("title"),
      actionDescription: t("description")
    }}
  >
    <VenueForm {...{ t }} />
  </SingleActionView>
);

AddVenue.getInitialProps = async () => ({
  namespacesRequired: namespaces
});

AddVenue.propTypes = {
  t: func.isRequired,
  i18n: shape({ language: string.isRequired }).isRequired
};

export default withTranslation(namespaces)(AddVenue);
