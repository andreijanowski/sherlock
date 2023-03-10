import React, { useMemo } from "react";
import Tippy from "@tippyjs/react";

import LanguageSwitcher from "components/LanguageSwitcher";
import FoodetectiveTextLogo from "components/FoodetectiveTextLogo";
import { useT } from "utils/hooks";
import {
  ColumnTitle,
  FooterWrapper,
  Line,
  MenuWrapper,
  NavItem,
  Copywrite,
  RelativeWrapper,
  StyledFlexWrapper
} from "./styled";
import NavigationList from "./navigationList";
import { getConfig } from "./utils";
import Socials from "./Socials";
import Copyrights from "./Copyrights";
import NewsletterForm from "./NewsletterForm";
import { Globe } from "../Icons";

const Footer = () => {
  const t = useT("footer");
  const config = useMemo(() => getConfig(t), [t]);

  return (
    <FooterWrapper>
      <MenuWrapper>
        <NavItem width={[1, 1 / 2, 2 / 5]} p={2}>
          <ColumnTitle>{t("newsletter.title")}</ColumnTitle>
          <NewsletterForm />
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
      <RelativeWrapper
        mb={2}
        justifyContent="space-between"
        alignItems="flex-start"
        width="100%"
      >
        <StyledFlexWrapper alignItems="center" flexWrap="wrap">
          <FoodetectiveTextLogo />
          <LanguageSwitcher withNoFlag listPosition="top">
            <Globe />
          </LanguageSwitcher>
          <Tippy maxWidth="none" placement="top-end" content={<Copyrights />}>
            <Copywrite>Copyright notice</Copywrite>
          </Tippy>
        </StyledFlexWrapper>
        <Socials />
      </RelativeWrapper>
    </FooterWrapper>
  );
};

export default Footer;
