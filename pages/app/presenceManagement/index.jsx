import React from "react";
import { func } from "prop-types";
import { compose } from "redux";

import { withTranslation } from "i18n";
import requireAuth from "lib/requireAuth";
import AppLayout from "layout/App";
import { useLng } from "utils/hooks";
import PartooIframe from "components/PartooIframe";

const namespaces = ["forms", "app"];

const PresenceManagementPage = ({ t }) => {
  const lng = useLng();
  return (
    <AppLayout
      {...{
        t,
        lng,
        mainIcon: "presenceManagement",
        header: t("app:presenceManagement")
      }}
    >
      <PartooIframe startPage="presenceManagement" />
    </AppLayout>
  );
};

PresenceManagementPage.getInitialProps = async () => ({
  namespacesRequired: namespaces
});

PresenceManagementPage.propTypes = {
  t: func.isRequired
};

export default compose(
  requireAuth(true),
  withTranslation(namespaces)
)(PresenceManagementPage);
