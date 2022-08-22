import React from "react";
import { connect } from "react-redux";
import { bool, shape } from "prop-types";
import { useT } from "utils/hooks";

import VideoButton from "components/Landing/VideoButton";
import { INTEGRATIONS_VIDEO_URL } from "consts";
import PartnersSearchBox from "components/PartnersSearchBox";
import { AdaptiveBox } from "components/styleguide/common";
import { PartnerTile } from "components/PartnerTile";
import { LoadingIndicator } from "components";
import { sectionItemShape } from "../types";
import {
  Container,
  SubtitleStyled,
  PartnersListContainer,
  PartnersWrapper
} from "./styled";

const Partners = ({ activeItem, partners, isLoading }) => {
  const t = useT("app");
  const hasPartners = !isLoading && partners && partners.size > 0;

  return (
    <Container>
      <AdaptiveBox display={["block"]} width="100%">
        <PartnersSearchBox
          visibilityRange={[0, 5000]}
          hasAvailablePartners
          activeFilter={activeItem.id}
        />
        <SubtitleStyled mb={4}>{activeItem.label}</SubtitleStyled>
      </AdaptiveBox>
      <PartnersListContainer>
        {hasPartners && (
          <PartnersWrapper>
            {partners.map(partner => {
              const partnerId = partner.get("id");

              return (
                <PartnerTile
                  key={partnerId}
                  t={t}
                  partner={partner.get("attributes")}
                  partnerId={partnerId}
                />
              );
            })}
          </PartnersWrapper>
        )}
        {isLoading && <LoadingIndicator hasTransparentBackground />}
      </PartnersListContainer>
      <AdaptiveBox display={["none", null, "flex"]} alignItems="center">
        <VideoButton url={INTEGRATIONS_VIDEO_URL} />
      </AdaptiveBox>
    </Container>
  );
};

Partners.propTypes = {
  activeItem: sectionItemShape.isRequired,
  partners: shape(),
  isLoading: bool
};

Partners.defaultProps = {
  partners: {},
  isLoading: false
};

const mapState = state => ({
  partners: state.getIn(["partners", "data"]),
  isLoading: state.getIn(["partners", "isFetching"])
});

export default connect(mapState, null)(Partners);
