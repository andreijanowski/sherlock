import React, { useMemo } from "react";
import { Box } from "@rebass/grid";
import { func } from "prop-types";

import { withTranslation } from "i18n";
import FoodetectiveTextLogo from "components/FoodetectiveTextLogo";
import {
  ColumnTitle,
  FooterWrapper,
  Line,
  MenuWrapper,
  NavItem
} from "./styled";
import NavigationList from "./navigationList";
import { getConfig } from "./utils";
import Socials from "./Socials";
import Copyrights from "./Copyrights";

const namespaces = ["footer"];

const Footer = ({ t }) => {
  const config = useMemo(() => getConfig(t), [t]);

  return (
    <FooterWrapper>
      <MenuWrapper>
        <NavItem width={[1, 1 / 2, 2 / 5]} p={2}>
          <ColumnTitle>{t("navigation.columnFour.title")}</ColumnTitle>
          <Socials />
        </NavItem>
        {config.map(({ title, name, hrefs }) => (
          <NavItem key={name} width={[1, 1 / 2, 1 / 5]} p={2}>
            <ColumnTitle>{title}</ColumnTitle>
            <NavigationList
              {...{
                t,
                columnName: name,
                hrefs
              }}
            />
          </NavItem>
        ))}
      </MenuWrapper>
      <Line />
      <Box mb={2}>
        <FoodetectiveTextLogo isSmall />
      </Box>
      <Copyrights />
    </FooterWrapper>
  );
};
Footer.propTypes = {
  t: func.isRequired
};

export default withTranslation(namespaces)(Footer);
