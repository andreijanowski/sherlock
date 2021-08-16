import React, { useCallback, useMemo } from "react";
import { func, shape, bool } from "prop-types";
import { Box } from "@rebass/grid";

import { AcceptedDetectiveIcon } from "components/Icons";
import { Card, DetectiveIconWrapper, Info } from "./styled";
import { getClientDetails } from "../utils";
import { Avatar, AvatarWrapper, Name, DetectiveLabel } from "../styled";

const ClientsCard = ({ t, client, onClientClick, isActive }) => {
  const onCardClick = useCallback(() => {
    onClientClick(client);
  }, [client, onClientClick]);

  const {
    avatar,
    name,
    personal: { phone, email },
    acceptedFoodDetective
  } = useMemo(() => getClientDetails(client, t), [client, t]);

  return (
    <Card onClick={onCardClick} isActive={isActive}>
      <AvatarWrapper mr={3}>
        <Avatar src={avatar} />
        {acceptedFoodDetective && (
          <DetectiveIconWrapper>
            <AcceptedDetectiveIcon />
          </DetectiveIconWrapper>
        )}
      </AvatarWrapper>
      <Box>
        <Box mb={1}>
          <Name>{name}</Name>
        </Box>
        {acceptedFoodDetective && (
          <Box mb={1}>
            <DetectiveLabel>{t("clients:acceptedDetective")}</DetectiveLabel>
          </Box>
        )}
        {phone && <Info>{phone}</Info>}
        {email && <Info>{email}</Info>}
      </Box>
    </Card>
  );
};

ClientsCard.propTypes = {
  t: func.isRequired,
  client: shape().isRequired,
  onClientClick: func.isRequired,
  isActive: bool.isRequired
};

export default ClientsCard;
