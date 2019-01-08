/* eslint-disable react/forbid-prop-types */
import { Flex } from "@rebass/grid";
import { NotificationsCenter } from "components";
import styled from "styled-components";
import { object, node } from "prop-types";
import GlobalStyles from "utils/globalStyles";

const AppContainer = styled(Flex)`
  min-height: 100vh;
  max-width: 100%;
  overflow: hidden;
`;

const MainLayout = ({ pageProps, Component }) => (
  <AppContainer flexDirection="column" alignItems="center">
    <GlobalStyles />
    <Component {...pageProps} />
    <NotificationsCenter />
  </AppContainer>
);

MainLayout.propTypes = {
  pageProps: object.isRequired,
  Component: node.isRequired
};

export default MainLayout;
