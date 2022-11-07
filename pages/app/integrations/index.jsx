import { useEffect, useState } from "react";
import { withTranslation } from "i18n";
import requireAuth from "lib/requireAuth";
import { func, string, shape, bool } from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import { Flex } from "@rebass/grid";
import PartnersSearchBox from "components/PartnersSearchBox";
import AppLayout from "layout/App";
import { PARTNERS_CATEGORIES, PARTNERS_URL } from "sections/integrations/utils";
import {
  Button,
  ButtonWithImageIconWrapper,
  ButtonWithImageText,
  LoadingIndicator
} from "components";
import IntegrationsList from "sections/integrations";
import { IconWrapper } from "components/Dashboard/styled";
import { INTEGRATIONS_FILTERS, filters } from "./utils";

const namespaces = ["forms", "app"];

const IntegrationsPage = ({ t, lng, partners, isLoading }) => {
  const [currentFilter, setCurrentFilter] = useState(filters[0]);
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

  const filteredPartners =
    currentFilter.name === INTEGRATIONS_FILTERS.ALL
      ? partners
      : partners.filter(
          p => p.getIn(["attributes", "status"]) === currentFilter.name
        );

  return (
    <AppLayout
      t={t}
      lng={lng}
      mainIcon="integrations"
      header={t("app:integrations")}
    >
      <Flex mb={4} mx={2}>
        {filters.map(tab => (
          <Button
            key={tab.name}
            as="a"
            styleName="withImage"
            active={currentFilter.name === tab.name}
            onClick={() => setCurrentFilter(tab)}
            margin="10px 16px 0 0"
            gradient
          >
            <ButtonWithImageIconWrapper>
              <IconWrapper active={currentFilter.name === tab.name}>
                {tab.icon}
              </IconWrapper>
            </ButtonWithImageIconWrapper>
            <ButtonWithImageText>{t(tab.name)}</ButtonWithImageText>
          </Button>
        ))}
      </Flex>
      <PartnersSearchBox visibilityRange={[60, 640]} />
      {filteredPartners && filteredPartners.size > 0 && (
        <IntegrationsList partners={filteredPartners} isIntegrations t={t} />
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
