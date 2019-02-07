import UserLayout from "sections/settings/Layout";
import Form from "sections/settings/basicInformation";
import withI18next from "lib/withI18next";
import requireAuth from "lib/requireAuth";
import { func } from "prop-types";

const namespaces = ["settings", "app"];

const BasicInformation = ({ t }) => (
  <UserLayout {...{ t }}>
    <Form {...{ t }} />
  </UserLayout>
);

BasicInformation.propTypes = {
  t: func.isRequired
};

export default requireAuth(true)(withI18next(namespaces)(BasicInformation));
