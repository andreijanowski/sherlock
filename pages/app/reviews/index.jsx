import React from "react";
import { func } from "prop-types";
import { compose } from "redux";

import { withTranslation } from "i18n";
import requireAuth from "lib/requireAuth";
import AppLayout from "layout/App";
import { useLng } from "utils/hooks";
import PartooIframe from "components/PartooIframe";

const namespaces = ["forms", "app"];

const ReviewsPage = ({ t }) => {
  const lng = useLng();
  return (
    <AppLayout
      {...{
        t,
        lng,
        mainIcon: "reviews",
        header: t("app:reviews")
      }}
    >
      <PartooIframe startPage="reviewManagement" />
    </AppLayout>
  );
};

ReviewsPage.getInitialProps = async () => ({
  namespacesRequired: namespaces
});

ReviewsPage.propTypes = {
  t: func.isRequired
};
export default compose(
  requireAuth(true),
  withTranslation(namespaces)
)(ReviewsPage);
