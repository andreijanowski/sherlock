import BigCalendar from "react-big-calendar";
import moment from "moment";

export const preparePeriodsList = t => [
  {
    value: "day",
    label: t("day")
  },
  {
    value: "week",
    label: t("week")
  },
  {
    value: "month",
    label: t("month")
  },
  {
    value: "year",
    label: t("year")
  }
];

export const parseCaterings = (caterings, currency) =>
  (caterings || []).map(c => {
    const start = new Date(c.date);
    start.setSeconds(c.from);
    const end = new Date(c.date);
    if (c.from > c.to) {
      // UGLY HACK. TODO: RETHINK HOW TO SOLVE PROBLEM WITH DISPLAYING EVENTS WHEN EVENT TAKES MORE THAN 1 DAY
      end.setSeconds(82799);
    } else {
      end.setSeconds(c.to);
    }
    return {
      title: c.name,
      start,
      end,
      allDay: false,
      resource: {
        start,
        end,
        currency,
        ...c
      }
    };
  });

export const localizer = BigCalendar.momentLocalizer(moment);
