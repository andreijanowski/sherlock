import React from "react";
import { func } from "prop-types";
import { compose } from "redux";

import { withTranslation } from "i18n";
import requireAuth from "lib/requireAuth";
import AppLayout from "layout/App";
import { useLng } from "utils/hooks";
import ReviewIframe from "components/ReviewIframe";

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
      <ReviewIframe />
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
