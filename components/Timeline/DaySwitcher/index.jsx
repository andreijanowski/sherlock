import { useState } from "react";
import { instanceOf, func } from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import onClickOutside from "react-onclickoutside";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";
import {
  SlotsWrapper,
  Date,
  Arrow,
  DaySwitcherWrapper,
  DayPickerWrapper
} from "../styled";

const DaySwitcher = ({ changeDate, choosedDate }) => {
  const [isCalendarVisible, setCalendarVisibility] = useState(false);
  DaySwitcher.handleClickOutside = () => setCalendarVisibility(false);

  return (
    <DaySwitcherWrapper>
      <Arrow
        left
        onClick={() => changeDate(moment(choosedDate).subtract(1, "d"))}
      >
        <FontAwesomeIcon icon={["fa", "angle-left"]} />
      </Arrow>
      <SlotsWrapper
        onClick={() => {
          setCalendarVisibility(state => !state);
        }}
      >
        <Date>
          {choosedDate.format("Do MMM")} <br />
          {choosedDate.format("YYYY")}
        </Date>
      </SlotsWrapper>
      <Arrow onClick={() => changeDate(moment(choosedDate).add(1, "d"))}>
        <FontAwesomeIcon icon={["fa", "angle-right"]} />
      </Arrow>
      {isCalendarVisible && (
        <DayPickerWrapper>
          <DayPicker
            showOutsideDays
            selectedDays={choosedDate.toDate()}
            onDayClick={date => {
              setCalendarVisibility(false);
              changeDate(moment(date));
            }}
          />
        </DayPickerWrapper>
      )}
    </DaySwitcherWrapper>
  );
};

DaySwitcher.propTypes = {
  choosedDate: instanceOf(moment).isRequired,
  changeDate: func.isRequired
};

const clickOutsideConfig = {
  handleClickOutside: () => DaySwitcher.handleClickOutside
};

export default onClickOutside(DaySwitcher, clickOutsideConfig);
