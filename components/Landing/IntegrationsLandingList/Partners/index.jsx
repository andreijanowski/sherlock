import React from "react";
import { connect } from "react-redux";
import { bool, shape } from "prop-types";
import { useT } from "utils/hooks";

import VideoButton from "components/Landing/VideoButton";
import { INTEGRATIONS_VIDEO_URL } from "consts";
import PartnersSearchBox from "components/PartnersSearchBox";
import { AdaptiveBox } from "components/styleguide/common";
import IntegrationsList from "sections/integrations";
import { LoadingIndicator } from "components";
import { sectionItemShape } from "../types";
import { Container, SubtitleStyled, PartnersListContainer } from "./styled";

const Partners = ({ activeItem, partners, isLoading }) => {
  console.log("partners", partners && partners.toJS(), activeItem);
  const t = useT("app");

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
        {!isLoading && partners && partners.size > 0 && (
          <IntegrationsList partners={partners} isIntegrations t={t} />
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
