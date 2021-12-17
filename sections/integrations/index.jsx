import React, { useCallback, useEffect, useState } from "react";
import { arrayOf, bool, func, oneOfType, shape, string } from "prop-types";
import { noop } from "lodash";
import { connect } from "react-redux";
import { Box, Flex } from "@rebass/grid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import { WHOLESALERS_CATEGORY } from "consts";
import { fetchPartners } from "actions/partners";
import { IntegrationTile, WholesalerTile } from "components/PartnerTile";
import { selectPreviousConfig } from "selectors/integrations";
import LoadingIndicator from "components/LoadingIndicator";
import {
  GridWrapper,
  Wrapper,
  NoPartners,
  BackToListButton,
  IframeWrapper,
  BlueButton,
  IFrame
} from "./styled";

const SCROLL_GAP = 100;

const PARTNER_FRAME_ID = "partnerFrame";

const IntegrationsList = ({
  category,
  partners,
  t,
  onAddToFavorite,
  hasMore,
  previousConfig,
  fetchPartnersHandler,
  isLoading,
  isIntegrations
}) => {
  const [iframeUrl, setIframeUrl] = useState(null);
  const [isIFrameLoading, setIsIFrameLoading] = useState(false);
  const isPreferred = category === WHOLESALERS_CATEGORY.PREFERRED;

  const onWholesalerOrderNowClick = useCallback(partner => {
    const websiteUrl = partner.get("websiteUrl");
    const supportsIframe = partner.get("websiteSupportsIframe");
    if (supportsIframe) {
      setIsIFrameLoading(true);
      setIframeUrl(websiteUrl);
      return;
    }

    window.open(websiteUrl, "_blank", "noreferrer,noopener");
  }, []);

  const onBackToListClick = useCallback(() => {
    setIframeUrl(null);
  }, []);

  const onIFrameLoaded = useCallback(() => {
    setIsIFrameLoading(false);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const pageHeight = document.body.clientHeight;
      const scrolledHeight = window.scrollY + window.innerHeight;
      const isFetchAvailable = !isLoading && hasMore && previousConfig;
      const isScrolledToBottom = scrolledHeight + SCROLL_GAP > pageHeight;
      const shouldFetch = isFetchAvailable && isScrolledToBottom;
      if (shouldFetch) {
        fetchPartnersHandler({
          ...previousConfig,
          merge: true,
          page: previousConfig.page + 1,
          search: "active"
        });
      }
    };
    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [isLoading, previousConfig, hasMore, fetchPartnersHandler]);

  useEffect(() => {
    setIframeUrl(null);
  }, [category]);

  if (!partners.size) {
    return (
      <Wrapper>
        <NoPartners width="100%" alignItems="center" justifyContent="center">
          {t(
            `app:manageIntegrations.${
              isPreferred ? "noPreferred" : "noPartners"
            }`
          )}
        </NoPartners>
      </Wrapper>
    );
  }

  if (isIntegrations) {
    return (
      <GridWrapper justifyContent="flex-start">
        {partners.map(partner => {
          const partnerId = partner.get("id");

          return (
            <IntegrationTile
              key={partnerId}
              t={t}
              partner={partner.get("attributes")}
              partnerId={partnerId}
            />
          );
        })}
      </GridWrapper>
    );
  }

  return iframeUrl ? (
    <>
      <Flex mb={4} justifyContent="space-between" alignItems="center">
        <BackToListButton onClick={onBackToListClick}>
          <Box mr={2}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </Box>
          {t("app:manageIntegrations.backToList")}
        </BackToListButton>
        <BlueButton
          as="a"
          href={iframeUrl}
          target="_blank"
          styleName="navyBlue"
          rel="noreferrer noopener"
        >
          {t("app:manageIntegrations.openInNewTab")}
        </BlueButton>
      </Flex>
      <IframeWrapper>
        <IFrame id={PARTNER_FRAME_ID} src={iframeUrl} onLoad={onIFrameLoaded} />
        {isIFrameLoading && <LoadingIndicator size={15} />}
      </IframeWrapper>
    </>
  ) : (
    <Wrapper>
      {partners.map(partner => {
        const partnerId = partner.get("id");

        return (
          <WholesalerTile
            key={partnerId}
            partner={partner.get("attributes")}
            partnerId={partnerId}
            t={t}
            onAddClick={onAddToFavorite}
            onOrderNowClick={onWholesalerOrderNowClick}
          />
        );
      })}
    </Wrapper>
  );
};

IntegrationsList.defaultProps = {
  category: "",
  onAddToFavorite: noop,
  hasMore: false,
  isIntegrations: false,
  previousConfig: null
};

IntegrationsList.propTypes = {
  category: string,
  partners: oneOfType([shape(), arrayOf()]).isRequired,
  t: func.isRequired,
  onAddToFavorite: func,
  fetchPartnersHandler: func.isRequired,
  hasMore: bool,
  isLoading: bool.isRequired,
  isIntegrations: bool,
  previousConfig: shape()
};

const mapState = state => ({
  isLoading: state.getIn(["partners", "isFetching"]),
  hasMore: state.getIn(["partners", "hasMore"]),
  previousConfig: selectPreviousConfig(state)
});

const mapDispatch = {
  fetchPartnersHandler: fetchPartners
};

export default connect(
  mapState,
  mapDispatch
)(IntegrationsList);
