import React, { useMemo } from "react";
import { Box } from "@rebass/grid";

import FoodetectiveTextLogo from "components/FoodetectiveTextLogo";
import { useT } from "utils/hooks";
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

const Footer = () => {
  const t = useT("footer");
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

export default Footer;
