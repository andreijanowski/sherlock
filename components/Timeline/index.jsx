import { createRef, useState } from "react";
import { number } from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { Wrapper, SlotsWrapper, SlotsScroller, Slot, Arrow } from "./styled";
import { generateSlotsArray } from "./utils";

const Timeline = ({ from, to, slots }) => {
  const slotsWrapper = createRef();
  const slotsScroller = createRef();
  const [scrollPosition, scrollTo] = useState(0);

  const calculateAllSlotsWidth = direction => {
    const wrapperWidth = slotsWrapper.current.offsetWidth;
    const scrollerWidth = slotsScroller.current.offsetWidth;
    scrollTo(prevScrollPosition => {
      if (direction === "prev") {
        return Math.min(prevScrollPosition + (wrapperWidth * 7) / 8, 0);
      }
      return Math.max(
        prevScrollPosition - (wrapperWidth * 7) / 8,
        wrapperWidth - scrollerWidth
      );
    });
  };

  return (
    <Wrapper>
      <Arrow onClick={() => calculateAllSlotsWidth("prev")}>
        <FontAwesomeIcon icon={["fa", "angle-left"]} />
      </Arrow>
      <SlotsWrapper ref={slotsWrapper}>
        <SlotsScroller ref={slotsScroller} scrollPosition={scrollPosition}>
          {generateSlotsArray({ from, to, slots }).map(s => (
            <Slot>
              {moment({
                minutes: (s / 60) % 60,
                hours: (s / 60 / 60) % 24
              }).format("hh:mm A")}
            </Slot>
          ))}
        </SlotsScroller>
      </SlotsWrapper>
      <Arrow onClick={() => calculateAllSlotsWidth("next")}>
        <FontAwesomeIcon icon={["fa", "angle-right"]} />
      </Arrow>
    </Wrapper>
  );
};

Timeline.propTypes = {
  from: number.isRequired,
  to: number.isRequired,
  slots: number.isRequired
};

export default Timeline;
