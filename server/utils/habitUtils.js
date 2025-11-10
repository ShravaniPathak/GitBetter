import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek.js";

dayjs.extend(isoWeek);

export function getPeriodRange(goal) {
  const now = dayjs();

  if (goal === "Daily") {
    return {
      start: now.startOf("day").toDate(),
      end: now.endOf("day").toDate(),
    };
  }

  if (goal === "Weekly") {
    return {
      start: now.startOf("isoWeek").toDate(),
      end: now.endOf("isoWeek").toDate(),
    };
  }

  if (goal === "Monthly") {
    return {
      start: now.startOf("month").toDate(),
      end: now.endOf("month").toDate(),
    };
  }

  throw new Error("Invalid habit goal type");
}
