import React from "react";
import { arrayOf, func, oneOfType, shape, string } from "prop-types";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Box } from "@rebass/grid";

import { Container, ContentWrapper, IconAdded, Image } from "./styled";
import PartnerTileButtons from "../PartnerTileButtons";

const WholesalerTile = ({ partner, partnerId, t, onAddClick }) => {
  const isPreferred = partner.get("preferred");

  const iconAddedClick = () => {
    onAddClick({ added: isPreferred, partnerId });
  };

  return (
    <Container mb={3} width={1} alignItems="center">
      <IconAdded
        added={isPreferred}
        icon={isPreferred ? faMinus : faPlus}
        onClick={iconAddedClick}
      />
      <Image src={partner.getIn(["logo", "url"])} />
      <ContentWrapper
        flexDirection={["column", null, "row"]}
        alignItems="center"
        justifyContent="space-between"
        p={[3, 4]}
        flex="auto"
      >
        <Box mb={[3, null, 0]}>{partner.get("name")}</Box>
        <PartnerTileButtons
          t={t}
          partner={partner}
          linkLabel={t("app:manageIntegrations.orderNow")}
        />
      </ContentWrapper>
    </Container>
  );
};

WholesalerTile.propTypes = {
  partner: oneOfType([arrayOf(), shape()]).isRequired,
  partnerId: string.isRequired,
  t: func.isRequired,
  onAddClick: func.isRequired
};

export default WholesalerTile;
