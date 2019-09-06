import { useState } from "react";
import { instanceOf, func } from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import onClickOutside from "react-onclickoutside";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";
import {
  SlotsWrapper,
  Wrapper,
  Date,
  Arrow,
  DaySwitcherWrapper,
  DayPickerWrapper
} from "../styled";

const DaySwitcher = ({ chooseDate, choosenDate }) => {
  const [isCalendarVisible, setCalendarVisibility] = useState(false);
  DaySwitcher.handleClickOutside = () => setCalendarVisibility(false);

  return (
    <DaySwitcherWrapper>
      <Wrapper>
        <Arrow
          left
          onClick={() => chooseDate(moment(choosenDate).subtract(1, "d"))}
        >
          <FontAwesomeIcon icon={["fa", "angle-left"]} />
        </Arrow>
        <SlotsWrapper
          onClick={() => {
            setCalendarVisibility(state => !state);
          }}
        >
          <Date>
            {choosenDate.format("Do MMM")} <br />
            {choosenDate.format("YYYY")}
          </Date>
        </SlotsWrapper>
        <Arrow onClick={() => chooseDate(moment(choosenDate).add(1, "d"))}>
          <FontAwesomeIcon icon={["fa", "angle-right"]} />
        </Arrow>
      </Wrapper>
      {isCalendarVisible && (
        <DayPickerWrapper>
          <DayPicker
            showOutsideDays
            selectedDays={choosenDate.toDate()}
            onDayClick={date => {
              setCalendarVisibility(false);
              chooseDate(moment(date));
            }}
          />
        </DayPickerWrapper>
      )}
    </DaySwitcherWrapper>
  );
};

DaySwitcher.propTypes = {
  choosenDate: instanceOf(moment).isRequired,
  chooseDate: func.isRequired
};

const clickOutsideConfig = {
  handleClickOutside: () => DaySwitcher.handleClickOutside
};

export default onClickOutside(DaySwitcher, clickOutsideConfig);
