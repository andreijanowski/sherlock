import React from "react";
import { Box } from "@rebass/grid";

import { useT } from "utils/hooks";
import { capitalize } from "utils/strings";
import { partnersGroupShape } from "../../types";
import { Container, Partner, PartnerLabel, PartnerIcon } from "./styled";

const PartnersList = ({ activeGroup }) => {
  const t = useT("plans");
  return (
    <Container>
      {activeGroup.partners.map(
        ({
          isComingSoon,
          cannotBeIntegrated,
          label,
          icon,
          top,
          left,
          size
        }) => (
          <Partner
            key={`${icon}-${top}-${left}-${size}`}
            top={top}
            left={left}
            size={size}
          >
            {label && (
              <Box mb={2}>
                <PartnerLabel>{label}</PartnerLabel>
              </Box>
            )}
            <PartnerIcon src={`/static/img/integrationsHub/${icon}`} />
            {!cannotBeIntegrated && (
              <Box mt={2}>
                {isComingSoon ? (
                  <PartnerLabel>{capitalize(t("comingSoon"))}</PartnerLabel>
                ) : (
                  <img
                    src="/static/img/integrationsHub/toggledPartner.svg"
                    alt="Toggled"
                  />
                )}
              </Box>
            )}
          </Partner>
        )
      )}
    </Container>
  );
};

PartnersList.propTypes = {
  activeGroup: partnersGroupShape.isRequired
};

export default PartnersList;
