import React from "react";
import { Flex } from "@rebass/grid";

import { H2, H3 } from "components/styleguide/Typography";
import { useLng, useT } from "utils/hooks";
import Button, { BUTTON_VARIANT } from "components/styleguide/Button";
import { SUBSCRIPTION_ENTREPRISE_URL, SUBSCRIPTION_PLANS } from "consts";
import { getPlanLoginPath } from "utils/plans";
import { Column, Container, Subtitle, Mockup } from "./styled";

const Product = () => {
  const t = useT("landing");
  const lng = useLng();

  return (
    <Container px={3} pt="80px">
      <H2 mb={[4, null, null, 90]} tabletCentered>
        {t("product")}
      </H2>
      <Flex
        justifyContent="center"
        flexDirection={["column", null, null, "row"]}
      >
        <Column mb={[56, null, null, 0]} mr={[0, null, null, 180]}>
          <H3 mb={3} tabletCentered>
            {t("productContent.management.title")}
          </H3>
          <Subtitle mb={30} tabletCentered>
            {t("productContent.management.description")}
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
        </Column>
        <Column>
          <H3 mb={3} tabletCentered>
            {t("productContent.visibility.title")}
          </H3>
          <Subtitle mb={30} tabletCentered>
            {t("productContent.visibility.description")}
          </Subtitle>
          <Button
            variant={BUTTON_VARIANT.SECONDARY}
            as="a"
            target="_blank"
            href={getPlanLoginPath({
              lng,
              name: SUBSCRIPTION_PLANS.ESSENTIAL
            })}
            rel="noreferrer noopener"
            withArrow
          >
            {t("registerNow")}
          </Button>
        </Column>
      </Flex>
      <Mockup muted loop controls>
        <source src="/static/productFlow.mp4" type="video/mp4" />
      </Mockup>
    </Container>
  );
};

export default Product;
