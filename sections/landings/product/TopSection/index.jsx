import React from "react";
import { Flex } from "@rebass/grid";
import { shape, string } from "prop-types";

import { Trans } from "i18n";
import { H1Landing, Subtitle } from "components/styleguide/Typography";
import { useT } from "utils/hooks";
import { SUBSCRIPTION_ENTREPRISE_URL } from "consts";
import Button from "components/styleguide/Button";
import { AdaptiveBox } from "components/styleguide/common";
import { Container, TabletBlueText, TabletImageBox } from "./styled";

const TopSection = ({ name, leftColumnProps }) => {
  const t = useT("landing");

  return (
    <Container as={Flex}>
      <Flex
        pt={[46, null, null, 100]}
        pb={[52, null, null, 0]}
        flexDirection="column"
        alignItems={["center", null, null, "flex-start"]}
        width={[1, null, null, 1 / 2]}
        {...leftColumnProps}
      >
        <H1Landing tabletCentered>{t(`landings.${name}.title`)}</H1Landing>
        <TabletImageBox
          display={["block", null, null, "none"]}
          as="img"
          src={`/static/img/${name}/bannerTablet.png`}
          alt="tablet"
        />
        <Subtitle tabletCentered mb={[44, null, null, 54]}>
          <Trans
            t={t}
            i18nKey={`landings.${name}.subtitle`}
            components={[<TabletBlueText />]}
          />
        </Subtitle>
        <Button
          as="a"
          target="_blank"
          href={SUBSCRIPTION_ENTREPRISE_URL}
          rel="noreferrer noopener"
          withArrow
        >
          {t("bookDemo")}
        </Button>
      </Flex>
      <AdaptiveBox
        display={["none", null, null, "block"]}
        width={1 / 2}
        pt={66}
        ml={50}
      >
        <img src={`/static/img/${name}/bannerDesktop.png`} alt="tablet" />
      </AdaptiveBox>
    </Container>
  );
};

TopSection.propTypes = {
  name: string.isRequired,
  leftColumnProps: shape()
};

TopSection.defaultProps = {
  leftColumnProps: null
};

export default TopSection;
