import moment from "moment";

const convertDateTimeToDate = (datetime, timeZoneName) => {
  const m = moment.tz(datetime, timeZoneName);
  return new Date(m.year(), m.month(), m.date(), m.hour(), m.minute(), 0);
};

export const parseCaterings = ({
  caterings,
  addresses,
  currency,
  view,
  timeZoneName,
  t
}) => {
  const parsedCaterings = [];
  if (caterings && caterings.size) {
    caterings.forEach(c => {
      const start = convertDateTimeToDate(
        c.getIn(["attributes", "date"]),
        timeZoneName
      );
      start.setSeconds(c.getIn(["attributes", "from"]));
      let end;
      if (c.getIn(["attributes", "from"]) >= c.getIn(["attributes", "to"])) {
        end = new Date(c.getIn(["attributes", "date"]));
        if (view === "week" || view === "day") {
          end.setHours(23);
          end.setMinutes(59);
          end.setSeconds(59);
          const today = convertDateTimeToDate(
            c.getIn(["attributes", "date"]),
            timeZoneName
          );
          today.setHours(24);
          const secondHalf = parseCaterings(
            [
              {
                id: c.get("id"),
                ...c.get("attributes").toObject(),
                menu: c.getIn(["attributes", "menu"]).toObject(),
                from: 1,
                date: today.toISOString(),
                realFrom: c.getIn(["attributes", "from"]),
                address: addresses
                  .getIn([
                    c.getIn(["relationships", "address", "data", "id"]),
                    "attributes"
                  ])
                  .toObject()
              }
            ],
            currency,
            undefined,
            timeZoneName
          );
          parsedCaterings.push(secondHalf[0]);
        } else {
          end.setHours(24);
          end.setSeconds(c.getIn(["attributes", "to"]));
        }
        end = convertDateTimeToDate(end, timeZoneName);
      } else {
        end = convertDateTimeToDate(
          c.getIn(["attributes", "date"]),
          timeZoneName
        );
        end.setSeconds(c.getIn(["attributes", "to"]));
      }
      parsedCaterings.push({
        title: c.getIn(["attributes", "name"]),
        start,
        end,
        allDay: false,
        resource: {
          start,
          end,
          currency,
          id: c.get("id"),
          ...c.get("attributes").toObject(),
          menu: c.getIn(["attributes", "menu"]).toObject(),
          address: addresses
            .getIn([
              c.getIn(["relationships", "address", "data", "id"]),
              "attributes"
            ])
            .toObject()
        }
      });
    });

    console.log({ parsedCaterings });

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
      console.log({ monthViewCaterings });
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
