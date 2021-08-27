import React from "react";
import { Flex, Box } from "@rebass/grid";
import { connect } from "react-redux";
import { compose } from "redux";
import { func, bool, string } from "prop-types";
import { withTranslation } from "i18n";

import AppLayout from "layout/App";
import requireAuth from "lib/requireAuth";
import { selectClientsIsFetching } from "selectors/users";
import { LoadingIndicator } from "components";
import ClientsList from "sections/clients/ClientsList";
import { LoadingIndicatorWrapper } from "components/Clients/styled";

const namespaces = ["clients", "app"];

const ClientsPage = ({ t, lng, isFetching }) => (
  <AppLayout t={t} lng={lng} mainIcon="clients" header={t("app:clients")}>
    <Flex mx={-2} mt={3} alignItems="stretch">
      <Box width={1} px={3}>
        <ClientsList t={t} />
      </Box>
    </Flex>
    {isFetching && (
      <Box my={3}>
        <LoadingIndicatorWrapper>
          <LoadingIndicator size={15} />
        </LoadingIndicatorWrapper>
      </Box>
    )}
  </AppLayout>
);

ClientsPage.getInitialPageProps = async () => ({
  namespacesRequired: namespaces
});

ClientsPage.propTypes = {
  t: func.isRequired,
  lng: string.isRequired,
  isFetching: bool.isRequired
};

export default compose(
  requireAuth(true),
  withTranslation(namespaces),
  connect((state, { i18n }) => ({
    lng: (i18n && i18n.language) || "en",
    isFetching: selectClientsIsFetching(state)
  }))
)(ClientsPage);
