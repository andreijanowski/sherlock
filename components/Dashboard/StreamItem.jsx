import React from "react";
import { Flex } from "@rebass/grid";
import { func, shape } from "prop-types";

import {
  Avatar,
  Badge,
  StreamItemContainer,
  StreamItemRight,
  StreamStatus,
  Time
} from "./styled";
import { getStreamItemData } from "./utils";

const StreamItem = ({ t, item }) => {
  const { badgeNumber, status, time } = getStreamItemData(item, t);
  return (
    <StreamItemContainer as="li">
      <Flex alignItems="center">
        <Avatar />
        <StreamStatus>{status}</StreamStatus>
      </Flex>
      <StreamItemRight>
        <Badge>{badgeNumber}</Badge>
        <Time>{time}</Time>
      </StreamItemRight>
    </StreamItemContainer>
  );
};

StreamItem.propTypes = {
  t: func.isRequired,
  item: shape.isRequired
};

export default StreamItem;
