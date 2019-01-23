import { Flex } from "@rebass/grid";
import { NotificationsCenter } from "components";
import styled from "styled-components";
import { shape, node, oneOfType, string, func, element } from "prop-types";
import GlobalStyles from "utils/globalStyles";

const AppContainer = styled(Flex)`
  min-height: 100vh;
  max-width: 100%;
  overflow: hidden;
`;

const MainLayout = ({ pageProps, slug, Component }) => (
  <AppContainer flexDirection="column" alignItems="center">
    <GlobalStyles />
    <Component {...{ ...pageProps, slug }} />
    <NotificationsCenter />
  </AppContainer>
);

MainLayout.propTypes = {
  pageProps: shape().isRequired,
  Component: oneOfType([string, func, node, element]).isRequired,
  slug: string
};

MainLayout.defaultProps = {
  slug: ""
};

export default MainLayout;
