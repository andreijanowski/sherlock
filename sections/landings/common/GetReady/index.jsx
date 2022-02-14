import React, { useCallback } from "react";
import { Box, Flex } from "@rebass/grid";
import { useRouter } from "next/router";

import { SUBSCRIPTION_PLANS } from "consts";
import { getPlanLoginPath } from "utils/plans";
import Button, { BUTTON_VARIANT } from "components/styleguide/Button";
import { useLng, useT } from "utils/hooks";
import { Body, H1 } from "components/styleguide/Typography";
import { AdaptiveBox } from "components/styleguide/common";
import { DemoButton } from "components/Landing";
import { Container, H3Styled, Image, ImageContainer } from "./styled";

const GetReady = () => {
  const lng = useLng();
  const { route, push } = useRouter();
  const t = useT();

  const isSubscriptionsPage = route === "/pricing/subscriptions";

  const onSeeSubscriptionsClick = useCallback(() => {
    push(`/${lng}/pricing/subscriptions`);
  }, [lng, push]);

  return (
    <Container
      alignItems="center"
      px={3}
      pt="90px"
      pb={["80px", null, null, "105px"]}
      flexWrap={["wrap", "wrap", "nowrap"]}
    >
      <Flex
        flexDirection="column"
        alignItems={["center", null, null, "flex-start"]}
        width={[1, null, null, 3 / 5]}
      >
        <H1 tabletCentered mb={["24px", null, null, "32px"]}>
          {t("plans:getReady.title")}
        </H1>
        <Box mb={[48, null, null, 60]}>
          <AdaptiveBox display={["none", null, null, "block"]}>
            <H3Styled tabletCentered>
              {t("plans:getReady.description")}
            </H3Styled>
          </AdaptiveBox>
          <AdaptiveBox display={["block", null, null, "none"]}>
            <Body tabletCentered>{t("plans:getReady.description")}</Body>
          </AdaptiveBox>
        </Box>
        <Flex
          width={1}
          flexDirection={["column", null, "row"]}
          justifyContent={["center", null, null, "flex-start"]}
        >
          <DemoButton
            mr={[0, null, "13px"]}
            mb={[3, null, 0]}
            width={[1, null, "auto"]}
          />
          <Button
            width={[1, null, "auto"]}
            variant={BUTTON_VARIANT.SECONDARY}
            withArrow
            {...(isSubscriptionsPage
              ? {
                  as: "a",
                  target: "_blank",
                  href: getPlanLoginPath({
                    lng,
                    name: SUBSCRIPTION_PLANS.ESSENTIAL
                  }),
                  rel: "noreferrer noopener"
                }
              : { onClick: onSeeSubscriptionsClick })}
          >
            {isSubscriptionsPage
              ? t("landing:registerNow")
              : t("landing:seeSubscriptionPlans")}
          </Button>
        </Flex>
      </Flex>
      <AdaptiveBox
        display={["none", null, null, "block"]}
        width={[1, null, 1 / 2, 2 / 5]}
        pl={[0, null, 20]}
      >
        <ImageContainer>
          <Image src="/static/img/plansLandingTablet.png" />
        </ImageContainer>
      </AdaptiveBox>
    </Container>
  );
};

export default GetReady;
