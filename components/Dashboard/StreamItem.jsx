import React, { useCallback } from "react";
import { Flex } from "@rebass/grid";
import { func, shape } from "prop-types";

import { getOrderSourceLogo } from "utils/orderUtils";
import {
  StreamLogo,
  Badge,
  StreamItemContainer,
  StreamItemRight,
  StreamStatus,
  Time
} from "./styled";
import { getStreamItemData } from "./utils";

const StreamItem = ({ t, item, onItemClick }) => {
  const { badgeNumber, status, time } = getStreamItemData(item, t);
  const sourceLogo = getOrderSourceLogo(item);

  const onClick = useCallback(() => {
    onItemClick(item);
  }, [onItemClick, item]);

  return (
    <StreamItemContainer as="li" onClick={onClick}>
      <Flex alignItems="center" mr={2}>
        <StreamLogo src={sourceLogo} />
        <StreamStatus>{status}</StreamStatus>
      </Flex>
      <StreamItemRight>
        <Badge>#{badgeNumber}</Badge>
        <Time>{time}</Time>
      </StreamItemRight>
    </StreamItemContainer>
  );
};

StreamItem.propTypes = {
  t: func.isRequired,
  onItemClick: func.isRequired,
  item: shape().isRequired
};

export default StreamItem;
