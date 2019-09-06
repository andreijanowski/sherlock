import { createRef, useState, useEffect } from "react";
import { number, arrayOf, func } from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import {
  TimeSlotPickerWrapper,
  SlotsWrapper,
  SlotsScroller,
  Slot,
  Arrow
} from "../styled";

const Timeline = ({ slots, choosenSlot, chooseSlot }) => {
  const slotsWrapper = createRef();
  const slotsScroller = createRef();
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const choosenSlotIndex = slots.findIndex(e => e === choosenSlot);
    if (choosenSlotIndex <= 0) {
      setScrollPosition(0);
    } else {
      const wrapperWidth = slotsWrapper.current.offsetWidth;
      const scrollerWidth = slotsScroller.current.offsetWidth;
      const averageSlotWidth = scrollerWidth / slots.length;
      setScrollPosition(
        Math.max(
          Math.min(
            -(
              averageSlotWidth * choosenSlotIndex -
              (wrapperWidth - averageSlotWidth) / 2
            ),
            0
          ),
          wrapperWidth - scrollerWidth
        )
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slots, choosenSlot]);

  const calculateAllSlotsWidth = direction => {
    const wrapperWidth = slotsWrapper.current.offsetWidth;
    const scrollerWidth = slotsScroller.current.offsetWidth;
    setScrollPosition(prevScrollPosition => {
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
    <TimeSlotPickerWrapper>
      <Arrow left onClick={() => calculateAllSlotsWidth("prev")}>
        <FontAwesomeIcon icon={["fa", "angle-left"]} />
      </Arrow>
      <SlotsWrapper ref={slotsWrapper}>
        <SlotsScroller ref={slotsScroller} scrollPosition={scrollPosition}>
          {slots.map(s => {
            const time = moment({
              minutes: (s / 60) % 60,
              hours: (s / 60 / 60) % 24
            });
            return (
              <Slot isActive={choosenSlot === s} onClick={() => chooseSlot(s)}>
                {time.format("hh:mm")}
                <br />
                {time.format("A")}
              </Slot>
            );
          })}
        </SlotsScroller>
      </SlotsWrapper>
      <Arrow onClick={() => calculateAllSlotsWidth("next")}>
        <FontAwesomeIcon icon={["fa", "angle-right"]} />
      </Arrow>
    </TimeSlotPickerWrapper>
  );
};

Timeline.propTypes = {
  slots: arrayOf(number).isRequired,
  choosenSlot: number,
  chooseSlot: func.isRequired
};

Timeline.defaultProps = {
  choosenSlot: undefined
};

export default Timeline;
