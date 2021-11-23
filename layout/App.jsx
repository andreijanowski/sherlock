import React, { useCallback } from "react";
import { Flex } from "@rebass/grid";
import { node, bool, func, string } from "prop-types";
import { connect } from "react-redux";
import { useRouter } from "next/router";

import { LoadingIndicator, MainApp, NavigationContainer, H3 } from "components";
import { Confirm } from "components/modals";
import { postBusiness } from "actions/businesses";
import { logout as logoutAction } from "actions/auth";
import { BASIC_ROLE } from "sagas/users";

const REDIRECT_URL = "/app/subscriptions/";

const AppLayout = ({
  children,
  mainIcon,
  header,
  t,
  lng,
  role,
  createBusiness,
  logout,
  isFetching,
  containerComponent
}) => {
  const router = useRouter();

  const onConfirmModalSubmit = useCallback(() => {
    createBusiness(() => {
      router.push(`/${lng}${REDIRECT_URL}`);
    });
  }, [createBusiness, lng, router]);

  const onConfirmModalClose = useCallback(() => {
    logout();
  }, [logout]);

  const shouldShowConfirmBOModal = role === BASIC_ROLE;

  return (
    <Flex
      as={containerComponent}
      flexDirection={["column", "row"]}
      width={1}
      id="app"
    >
      <NavigationContainer t={t} lng={lng} />
      <MainApp mainIcon={mainIcon} header={header} t={t}>
        {children}
      </MainApp>
      {shouldShowConfirmBOModal && (
        <Confirm
          {...{
            btnOkText: t("forms:yes"),
            btnCancelText: t("forms:no"),
            open: true,
            restyled: true,
            onConfirm: onConfirmModalSubmit,
            onClose: onConfirmModalClose
          }}
        >
          {isFetching ? (
            <Flex pt={6} width={1} alignItems="center" justifyContent="center">
              <LoadingIndicator />
            </Flex>
          ) : (
            <H3>{t("app:becomeBOPrompt")}</H3>
          )}
        </Confirm>
      )}
    </Flex>
  );
};

AppLayout.propTypes = {
  children: node.isRequired,
  containerComponent: node,
  mainIcon: string,
  header: node,
  t: func.isRequired,
  lng: string.isRequired,
  isFetching: bool.isRequired,
  createBusiness: func.isRequired,
  logout: func.isRequired,
  role: string
};

AppLayout.defaultProps = {
  containerComponent: undefined,
  mainIcon: null,
  header: null,
  role: null
};

export default connect(
  state => {
    const isFetching = state.getIn(["users", "currentBusiness", "isFetching"]);

    const users = state.getIn(["users", "profile", "data", "users"]);
    const user = users && users.first();
    const role = user && user.getIn(["attributes", "role"]);

    return {
      isFetching,
      role
    };
  },
  {
    createBusiness: postBusiness,
    logout: logoutAction
  }
)(AppLayout);
