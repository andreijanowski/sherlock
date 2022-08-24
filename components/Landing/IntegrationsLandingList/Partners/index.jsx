import React, { useState } from "react";
import { connect } from "react-redux";
import { bool, shape, number } from "prop-types";
import { useT } from "utils/hooks";

import VideoButton from "components/Landing/VideoButton";
import { INTEGRATIONS_VIDEO_URL } from "consts";
import PartnersSearchBox from "components/PartnersSearchBox";
import { AdaptiveBox } from "components/styleguide/common";
import { PartnerTile } from "components/PartnerTile";
import { LoadingIndicator } from "components";
import { sectionItemShape } from "../types";
import { getSortedPartners } from "../utils";
import {
  Container,
  SubtitleStyled,
  PartnersListContainer,
  PartnersWrapper,
  MoreButton
} from "./styled";

const Partners = ({ activeItem, partners, isLoading, hasMore, page }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const t = useT("app");
  const normalisedPartnters = partners && partners.toJS();
  const filteredPartners = getSortedPartners(normalisedPartnters);

  const hasPartners =
    !isLoading && filteredPartners && filteredPartners.length > 0;

  const loadMore = () => setCurrentPage(page + 1);
  const clearPage = () => setCurrentPage(1);

  return (
    <Container>
      <AdaptiveBox display={["block"]} width="100%">
        <PartnersSearchBox
          visibilityRange={[0, 5000]}
          hasAvailablePartners
          activeFilter={activeItem.id}
          loadMore={loadMore}
          page={currentPage}
          clearPage={clearPage}
        />
        <SubtitleStyled mb={4}>{activeItem.label}</SubtitleStyled>
      </AdaptiveBox>
      <PartnersListContainer>
        {hasPartners && (
          <PartnersWrapper>
            {filteredPartners.map(partner => {
              const partnerId = partner.id;

              return (
                <PartnerTile
                  key={partnerId}
                  t={t}
                  partner={partner.attributes}
                  partnerId={partnerId}
                />
              );
            })}
          </PartnersWrapper>
        )}
        {isLoading && <LoadingIndicator hasTransparentBackground />}
      </PartnersListContainer>
      <AdaptiveBox
        display={["none", null, "flex"]}
        alignItems="center"
        flexDirection="column"
      >
        {hasMore && <MoreButton onClick={loadMore}>{t("loadMore")}</MoreButton>}
        <VideoButton url={INTEGRATIONS_VIDEO_URL} />
      </AdaptiveBox>
    </Container>
  );
};

Partners.propTypes = {
  activeItem: sectionItemShape.isRequired,
  partners: shape(),
  isLoading: bool,
  hasMore: bool,
  page: number
};

Partners.defaultProps = {
  partners: {},
  isLoading: false,
  hasMore: true,
  page: 1
};

const mapState = state => ({
  partners: state.getIn(["partners", "data"]),
  isLoading: state.getIn(["partners", "isFetching"]),
  hasMore: state.getIn(["partners", "hasMore"]),
  page: state.getIn(["partners", "previousConfig", "page"])
});

export default connect(mapState, null)(Partners);
