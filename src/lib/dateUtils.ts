const decomposeDate = (date: Date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return { day, month, year };
};

export const dateToStringDate = (date: Date) => {
  const { day, month, year } = decomposeDate(date);
  return `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}`;
};

export const formatDate = (date: Date) => {
  const day = String(date.getDate());
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear());

  return `${day}/${month}/${year}`;
};

export const formatEventDates = (start: string, end: string) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const {
    day: startDay,
    month: startMonth,
    year: startYear,
  } = decomposeDate(startDate);
  const {
    day: endDay,
    month: endMonth,
    year: endYear,
  } = decomposeDate(endDate);

  if (startYear !== endYear) {
    return `du ${startDay}/${startMonth
      .toString()
      .padStart(2, "0")}/${startYear} au ${endDay}/${endMonth
      .toString()
      .padStart(2, "0")}/${endYear}`;
  } else if (startMonth !== endMonth) {
    return `du ${startDay}/${startMonth
      .toString()
      .padStart(2, "0")} au ${endDay}/${endMonth
      .toString()
      .padStart(2, "0")}/${endYear}`;
  } else if (startDay !== endDay) {
    return `du ${startDay} au ${endDay}/${endMonth
      .toString()
      .padStart(2, "0")}/${endYear}`;
  } else {
    return `le ${startDay}/${startMonth
      .toString()
      .padStart(2, "0")}/${startYear}`;
  }
};

export const isInFuture = (dateString: string) => {
  const today = new Date();
  const date = new Date(dateString);
  return date > today;
};
