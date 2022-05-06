import React, { useCallback, useEffect } from "react";
import Cookies from "js-cookie";
import { Flex } from "@rebass/grid";
import { node, func, string } from "prop-types";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import { Popup } from "components/modals";

import { MainApp, NavigationContainer } from "components";
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
  containerComponent
}) => {
  const hasBOAgreement = Cookies.get("BOA");
  const router = useRouter();
  const shouldShowConfirmBOModal = !hasBOAgreement && role === BASIC_ROLE;

  useEffect(() => {
    const timer = setTimeout(() => {
      if (hasBOAgreement && role === BASIC_ROLE) {
        createBusiness(() => {
          router.push(`/${lng}${REDIRECT_URL}`);
        });
      }
    }, 2000);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasBOAgreement, role]);

  const onConfirmModalSubmit = useCallback(() => {
    createBusiness(() => {
      router.push(`/${lng}${REDIRECT_URL}`);
    });
    Cookies.set("BOA", true);
  }, [createBusiness, lng, router]);

  const onConfirmModalClose = useCallback(() => {
    Cookies.remove("BOA");
    logout();
  }, [logout]);

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
        <Popup
          cta={t("landing:landings.welcome.cta")}
          disclaimer={t("landing:landings.welcome.disclaimer")}
          title={t("landing:landings.welcome.title")}
          subtitle={t("landing:landings.welcome.subtitle")}
          image="/static/img/popup1.svg"
          hasRedirection
          hasCancelButton
          onConfirm={onConfirmModalSubmit}
          onCloseModal={onConfirmModalClose}
        />
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
    const users = state.getIn(["users", "profile", "data", "users"]);
    const user = users && users.first();
    const role = user && user.getIn(["attributes", "role"]);

    return {
      role
    };
  },
  {
    createBusiness: postBusiness,
    logout: logoutAction
  }
)(AppLayout);
