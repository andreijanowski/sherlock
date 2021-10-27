const TRANSLATIONS = {
  TODAY: "today",
  YESTERDAY: "yesterday",
  LAST_MONTH: "lastMonth",
  LAST_3_MONTH: "last3Months",
  LAST_YEAR: "lastYear"
};

export const OPTIONS = [
  {
    name: TRANSLATIONS.YESTERDAY,
    value: "yesterday"
  },
  {
    name: TRANSLATIONS.LAST_MONTH,
    value: "lastMonth"
  },
  {
    name: TRANSLATIONS.LAST_3_MONTH,
    value: "last3Months"
  },
  {
    name: TRANSLATIONS.LAST_YEAR,
    value: "lastYear"
  }
];

export const OPTIONS_FOR_REVENUE = [
  { name: TRANSLATIONS.TODAY, value: "sumToday" },
  {
    name: TRANSLATIONS.YESTERDAY,
    value: "sumYesterday"
  },
  {
    name: TRANSLATIONS.LAST_MONTH,
    value: "sumLastMonth"
  },
  {
    name: TRANSLATIONS.LAST_3_MONTH,
    value: "sumLast3Months"
  },
  {
    name: TRANSLATIONS.LAST_YEAR,
    value: "sumLastYear"
  }
];

export const SALES_OPTIONS = [
  {
    name: TRANSLATIONS.YESTERDAY,
    value: "day"
  },
  {
    name: TRANSLATIONS.LAST_MONTH,
    value: "month"
  },
  {
    name: TRANSLATIONS.LAST_3_MONTH,
    value: "quarter"
  },
  {
    name: TRANSLATIONS.LAST_YEAR,
    value: "year"
  }
];
