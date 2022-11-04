import React, { useCallback, useEffect } from "react";
import Cookies from "js-cookie";
import { Flex } from "@rebass/grid";
import { bool, node, func, string } from "prop-types";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import { Popup } from "components/modals";
import { MainApp, NavigationContainer } from "components";
import { postBusiness } from "actions/businesses";
import { logout as logoutAction } from "actions/auth";
import { BASIC_ROLE } from "sagas/users";

const AppLayout = ({
  businessId,
  children,
  mainIcon,
  header,
  t,
  lng,
  role,
  createBusiness,
  logout,
  containerComponent,
  hasBidCheck
}) => {
  const hasBOAgreement = Cookies.get("BOA");
  const router = useRouter();
  const shouldShowConfirmBOModal = !hasBOAgreement && role === BASIC_ROLE;

  useEffect(() => {
    const timer = setTimeout(() => {
      if (hasBOAgreement && role === BASIC_ROLE) {
        createBusiness();
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [createBusiness, hasBOAgreement, role]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (hasBidCheck && role === "business_member" && !businessId) {
        createBusiness(() => {
          router.push(`/${lng}/app/profile/basic-information/`);
        });
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [createBusiness, role, businessId, router, lng, hasBidCheck]);

  const onConfirmModalSubmit = useCallback(() => {
    Cookies.set("BOA", true);
    Cookies.set("Onboarding", true);
    createBusiness(() => {
      router.push(`/${lng}/app`);
    });
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
      <MainApp mainIcon={mainIcon} header={header}>
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
  businessId: string,
  children: node.isRequired,
  containerComponent: node,
  mainIcon: string,
  header: node,
  t: func.isRequired,
  lng: string.isRequired,
  createBusiness: func.isRequired,
  logout: func.isRequired,
  role: string,
  hasBidCheck: bool
};

AppLayout.defaultProps = {
  businessId: "",
  containerComponent: undefined,
  mainIcon: null,
  header: null,
  role: null,
  hasBidCheck: false
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
