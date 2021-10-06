import React, { useRef } from "react";
import { Flex } from "@rebass/grid";
import { scrollToNextItem } from "./utils";
import {
  Avatar,
  Tile,
  TileHeader,
  Spacer,
  StreamItem,
  StreamList,
  StreamItemRight,
  Badge,
  Time,
  StreamName,
  ChevronWrapper,
  StreamHeader
} from "./styled";
import { ChevronDown } from "../Icons";

const listItems = [
  { title: "Approved new booking", time: "2h", badge: "34" },
  { title: "Delivered to destination", time: "Now", badge: "15" },
  { title: "Arriving now", time: "2h", badge: "214" },
  { title: "Approved new booking", time: "2h", badge: "14" },
  { title: "Approved new booking", time: "1h", badge: "21" },
  { title: "Delivered to destination", time: "Now", badge: "15" },
  { title: "Delivered to destination", time: "Now", badge: "15" }
];

const Stream = () => {
  const myRef = useRef();

  return (
    <Tile height="645" width={1}>
      <StreamHeader alignItems="center" justifyContent="space-between">
        <TileHeader>Live Stream</TileHeader>
      </StreamHeader>
      <Spacer />
      <StreamList ref={myRef}>
        {listItems.map(item => (
          <StreamItem>
            <Flex alignItems="center">
              <Avatar />
              <StreamName>{item.title}</StreamName>
            </Flex>
            <StreamItemRight>
              <Badge>{item.badge}</Badge>
              <Time>{item.time}</Time>
            </StreamItemRight>
          </StreamItem>
        ))}
      </StreamList>
      <ChevronWrapper
        onClick={() => scrollToNextItem(myRef)}
        alignItems="center"
        justifyContent="center"
        width={1}
      >
        <ChevronDown />
      </ChevronWrapper>
    </Tile>
  );
};
export default Stream;
