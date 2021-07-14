import { useEffect } from "react";
import { withTranslation } from "i18n";
import requireAuth from "lib/requireAuth";
import { func, string, shape, bool } from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import PartnersSearchBox from "components/PartnersSearchBox";

import AppLayout from "layout/App";
import {
  generatePartnersMenuItems,
  PARTNERS_CATEGORIES,
  PARTNERS_URL
} from "sections/integrations/utils";
import { LoadingIndicator } from "components";
import IntegrationsList from "sections/integrations";

const namespaces = ["forms", "app"];

const IntegrationsPage = ({ t, lng, partners, isLoading }) => {
  const {
    query: { category },
    push
  } = useRouter();

  useEffect(() => {
    const isCategoryValid = !category || PARTNERS_CATEGORIES.includes(category);
    if (!isCategoryValid) {
      push(PARTNERS_URL);
    }
  }, [category, push]);

  return (
    <AppLayout
      showChosenWholesalers
      t={t}
      lng={lng}
      mainIcon="integrations"
      header={t("app:integrations")}
      withMenu
      menuItems={generatePartnersMenuItems(t, category)}
    >
      <PartnersSearchBox isHiddenOnDesktop />
      {partners && partners.size > 0 && (
        <IntegrationsList partners={partners} t={t} />
      )}
      {isLoading && <LoadingIndicator hasTransparentBackground />}
    </AppLayout>
  );
};

IntegrationsPage.getInitialProps = async () => ({
  namespacesRequired: namespaces
});

IntegrationsPage.propTypes = {
  t: func.isRequired,
  lng: string.isRequired,
  partners: shape(),
  isLoading: bool
};

IntegrationsPage.defaultProps = {
  partners: null,
  isLoading: false
};

export default compose(
  requireAuth(true),
  withTranslation(namespaces),
  connect((state, { i18n }) => ({
    lng: (i18n && i18n.language) || "en",
    partners: state.getIn(["partners", "data"]),
    isLoading: state.getIn(["partners", "isFetching"])
  }))
)(IntegrationsPage);
