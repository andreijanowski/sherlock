import moment from "moment";

const convertDateTimeToDate = (datetime, timeZoneName) => {
  const m = moment.tz(datetime, timeZoneName);
  return new Date(m.year(), m.month(), m.date(), m.hour(), m.minute(), 0);
};

export const parseCaterings = (caterings, currency, view, timeZoneName, t) => {
  const parsedCaterings = [];
  if (caterings && caterings.length) {
    caterings.forEach(c => {
      const start = convertDateTimeToDate(c.date, timeZoneName);
      start.setSeconds(c.from);
      let end;
      if (c.from >= c.to) {
        end = new Date(c.date);
        if (view === "week" || view === "day") {
          end.setHours(23);
          end.setMinutes(59);
          end.setSeconds(59);
          const today = convertDateTimeToDate(c.date, timeZoneName);
          today.setHours(24);
          const secondHalf = parseCaterings(
            [{ ...c, from: 1, date: today.toISOString(), realFrom: c.from }],
            currency,
            undefined,
            timeZoneName
          );
          parsedCaterings.push(secondHalf[0]);
        } else {
          end.setHours(24);
          end.setSeconds(c.to);
        }
        end = convertDateTimeToDate(end, timeZoneName);
      } else {
        end = convertDateTimeToDate(c.date, timeZoneName);
        end.setSeconds(c.to);
      }
      parsedCaterings.push({
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
      });
    });

    if (view === "month") {
      const days = {};
      parsedCaterings.forEach(c => {
        if (days[c.resource.date]) {
          days[c.resource.date].push(c);
        } else {
          days[c.resource.date] = [c];
        }
      });
      const monthViewCaterings = [];
      Object.values(days).forEach(day => {
        if (day.length === 1) {
          monthViewCaterings.push(day[0]);
        } else {
          monthViewCaterings.push({
            title: t("multipleEvents"),
            start: day[0].start,
            end: day[0].end,
            allDay: false,
            resource: day
          });
        }
      });
      return monthViewCaterings;
    }
  }
  return parsedCaterings;
};

export const parseDateTime = (date, time) =>
  moment(date)
    .hour(0)
    .minute(0)
    .second(time)
    .format("h:mm a");
