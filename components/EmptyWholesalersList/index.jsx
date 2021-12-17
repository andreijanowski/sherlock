import React from "react";
import { Box } from "@rebass/grid";
import { string, shape } from "prop-types";
import { connect } from "react-redux";

import { FOODETECTIVE_MAIL } from "consts";
import CenteredSection from "components/CenteredSection";
import { WHOLESALERS_PREFERRED_CATEGORY } from "sections/integrations/utils";
import { useT } from "utils/hooks";
import { Trans } from "i18n";
import { selectPreviousConfig } from "selectors/integrations";
import { SubtitleStyled, BodyStyled } from "./styled";

const EmptyWholesalersList = ({ category, previousConfig }) => {
  const t = useT("integrations");

  const isSearchFilled = !!(previousConfig && previousConfig.search);

  if (category === WHOLESALERS_PREFERRED_CATEGORY || !isSearchFilled) {
    return null;
  }

  return (
    <CenteredSection>
      <Box width={[1, "400px"]} px={3} textAlign="center">
        <SubtitleStyled mb={3}>{t("emptyWholesalers.title")}</SubtitleStyled>
        <BodyStyled>
          <Trans
            t={t}
            i18nKey="emptyWholesalers.description"
            components={[
              <a href={`mailto:${FOODETECTIVE_MAIL}`}>{FOODETECTIVE_MAIL}</a>
            ]}
          />
        </BodyStyled>
      </Box>
    </CenteredSection>
  );
};

EmptyWholesalersList.propTypes = {
  category: string.isRequired,
  previousConfig: shape().isRequired
};

const mapState = state => ({
  previousConfig: selectPreviousConfig(state)
});

export default connect(mapState)(EmptyWholesalersList);
