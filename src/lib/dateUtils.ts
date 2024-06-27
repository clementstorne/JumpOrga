export const formatDate = (date: Date) => {
  const day = String(date.getDate());
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear());

  return `${day}/${month}/${year}`;
};

const decomposeDate = (date: Date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return { day, month, year };
};

export const formatEventDates = (start: string, finish: string) => {
  const startDate = new Date(start);
  const finishDate = new Date(finish);
  const {
    day: startDay,
    month: startMonth,
    year: startYear,
  } = decomposeDate(startDate);
  const {
    day: finishDay,
    month: finishMonth,
    year: finishYear,
  } = decomposeDate(finishDate);

  if (startYear !== finishYear) {
    return `du ${startDay}/${startMonth
      .toString()
      .padStart(2, "0")}/${startYear} au ${finishDay}/${finishMonth
      .toString()
      .padStart(2, "0")}/${finishYear}`;
  } else if (startMonth !== finishMonth) {
    return `du ${startDay}/${startMonth
      .toString()
      .padStart(2, "0")} au ${finishDay}/${finishMonth
      .toString()
      .padStart(2, "0")}/${finishYear}`;
  } else if (startDay !== finishDay) {
    return `du ${startDay} au ${finishDay}/${finishMonth
      .toString()
      .padStart(2, "0")}/${finishYear}`;
  } else {
    return `le ${startDay}/${startMonth
      .toString()
      .padStart(2, "0")}/${startYear}`;
  }
};
