import React, { useCallback, useEffect } from "react";
import Cookies from "js-cookie";
import { Flex } from "@rebass/grid";
import PropTypes, { bool, node, func, string } from "prop-types";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import { Popup } from "components/modals";
import { MainApp, NavigationContainer } from "components";
import { postBusiness } from "actions/businesses";
import { logout as logoutAction } from "actions/auth";
import { BASIC_ROLE } from "sagas/users";
import Immutable from "immutable";

const AppLayout = ({
  businesses,
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
    if (hasBidCheck && role === "business_member" && businesses?.size === 0) {
      createBusiness(() => {
        router.push(`/${lng}/app/profile/basic-information/`);
      });
    }
  }, [businesses, createBusiness, hasBidCheck, lng, role, router]);

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
  hasBidCheck: bool,
  businesses: PropTypes.instanceOf(Immutable.Map)
};

AppLayout.defaultProps = {
  businessId: "",
  containerComponent: undefined,
  mainIcon: null,
  header: null,
  role: null,
  hasBidCheck: false,
  businesses: null
};

export default connect(
  state => {
    const users = state.getIn(["users", "profile", "data", "users"]);
    const user = users && users.first();
    const role = user && user.getIn(["attributes", "role"]);

    return {
      businesses: state.getIn([
        "users",
        "profileBusinesses",
        "data",
        "businesses"
      ]),
      role
    };
  },
  {
    createBusiness: postBusiness,
    logout: logoutAction
  }
)(AppLayout);
