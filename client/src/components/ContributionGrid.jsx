import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { addTapsAPi, deleteHabitApi } from "../api/habitApi";
import { generateMonochromaticPalette } from "@/utils/habitUtils";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Trash2, TrendingUp } from "lucide-react";

// ✅ Generate all dates from Jan 1 → Dec 31 of the current year
// Includes padding so the grid starts on Monday and ends on Sunday.
function getAlignedYearDates() {
  const dates = [];
  const today = new Date();
  const year = today.getFullYear();

  const start = new Date(Date.UTC(year, 0, 1)); // Jan 1
  const end = new Date(Date.UTC(year, 11, 31)); // Dec 31

  const startDay = start.getUTCDay() === 0 ? 7 : start.getUTCDay();
  const paddedStart = new Date(start);
  paddedStart.setUTCDate(start.getUTCDate() - (startDay - 1));

  const endDay = end.getUTCDay() === 0 ? 7 : end.getUTCDay();
  const paddedEnd = new Date(end);
  paddedEnd.setUTCDate(end.getUTCDate() + (7 - endDay));

  const current = new Date(paddedStart);
  while (current <= paddedEnd) {
    dates.push(new Date(current));
    current.setUTCDate(current.getUTCDate() + 1);
  }

  return dates;
}

const HabitGrid = ({ habits, onUpdate, onDelete }) => {
  const [dateRange, setDateRange] = useState([]);
  const [message, setMessage] = useState({});
  const [loading, setLoading] = useState({});
  const [deleteMessage, setDeleteMessage]=useState("");

  const output = (goal) => {
    if (goal === "Daily") return "Days";
    if (goal === "Weekly") return "Weeks";
    return "Months";
  };

  useEffect(() => {
    setDateRange(getAlignedYearDates());
  }, []);

  const handleAddTap = async (habitId) => {
    setLoading((prev) => ({ ...prev, [habitId]: true }));
    try {
      const res = await addTapsAPi(habitId);
      if (res.success) {
        setMessage((prev) => ({
          ...prev,
          [habitId]: res.body.message || "Tap added!",
        }));
        if (onUpdate) onUpdate();
      } else {
        setMessage((prev) => ({
          ...prev,
          [habitId]: res.body?.message || "Something went wrong",
        }));
      }
    } catch (err) {
      console.error(err);
      setMessage((prev) => ({ ...prev, [habitId]: "Error adding tap" }));
    } finally {
      setLoading((prev) => ({ ...prev, [habitId]: false }));
      setTimeout(() => {
        setMessage((prev) => ({ ...prev, [habitId]: "" }));
      }, 3000);
    }
  };

  const groupByWeek = (dates) => {
    const weeks = [];
    for (let i = 0; i < dates.length; i += 7) {
      weeks.push(dates.slice(i, i + 7));
    }
    return weeks;
  };

  return (
    <div className="space-y-10">
      {habits.map((habit) => {
        const totalCompletions = habit.completions;
        const tapsMap = {};
        let numDays = 0;

        habit.timestamps.forEach((ts) => {
          Object.entries(ts.tapsPerDay || {}).forEach(([day, taps]) => {
            tapsMap[day] = taps;
          });
          if (ts.totalTaps === totalCompletions) {
            numDays++;
          }
        });

        // ✅ No state updates inside render
        const currentStreak = numDays;
        const type = output(habit.goal);
        const weeks = groupByWeek(dateRange);

        const getCurrentPeriod = () => {
          const now = new Date();
          return habit.timestamps.find(
            (t) => new Date(t.startDate) <= now && new Date(t.endDate) >= now
          );
        };

        const currentPeriod = getCurrentPeriod();
        const yourTaps = currentPeriod ? currentPeriod.totalTaps : 0;
        const monthCompletions = habit.monthCompletions || 0;

        return (
          <div>
          <Card key={habit._id} className="p-6 border shadow-sm ">
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-3">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: habit.color }}
                />
                <div>
                  <h3 className="text-slate-900 dark:text-slate-50 font-semibold">
                    {habit.name}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm capitalize">
                    {habit.goal} goal
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  disabled={loading[habit._id]}
                  onClick={() => handleAddTap(habit._id)}
                >
                  {loading[habit._id] ? "Adding..." : "+ Add Tap"}
                </Button>

                {/* Delete button */}
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-slate-400 hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete habit?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will permanently delete "{habit.name}" and all its
                        data. This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={async e => {
                          const res=await deleteHabitApi(habit._id)
                          setDeleteMessage(res);
                          if (onDelete) onDelete(habit._id);
                        }}
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>

            {/* Stats section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4">
                <div className="text-slate-600 dark:text-slate-400 text-sm mb-1">
                  Your taps
                </div>
                <div className="text-slate-900 dark:text-slate-50">
                  {yourTaps}
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4">
                <div className="text-slate-600 dark:text-slate-400 text-sm mb-1">
                  Total
                </div>
                <div className="text-slate-900 dark:text-slate-50">
                  {totalCompletions}
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4">
                <div className="text-slate-600 dark:text-slate-400 text-sm mb-1 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  Current Streak
                </div>
                <div className="text-slate-900 dark:text-slate-50">
                  {currentStreak} {type}
                </div>
              </div>
            </div>

            {/* Message */}
            {message[habit._id] && (
              <p className="text-sm text-green-600 mb-3">
                {message[habit._id]}
              </p>
            )}

            {/* Contribution Grid */}
            <div className="overflow-x-auto">
              <div className="inline-block w-full">
                {/* Month headers */}
                <div className="flex mb-2 text-xs text-slate-600 dark:text-slate-400">
                  <div className="w-10" />
                  {[
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec",
                  ].map((month, i) => (
                    <div key={i} className="flex-1 text-center">
                      {month}
                    </div>
                  ))}
                </div>

                <div className="flex">
                  {/* Day labels */}
                  <div className="flex flex-col justify-between pr-2 text-xs text-slate-600 dark:text-slate-400">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                      (d) => (
                        <div key={d} className="h-3">
                          {d}
                        </div>
                      )
                    )}
                  </div>

                  {/* Grid */}
                  <div
                    className="grid gap-[2px] flex-1"
                    style={{
                      gridTemplateColumns: `repeat(${weeks.length}, minmax(0, 1fr))`,
                      gridAutoFlow: "column",
                    }}
                  >
                    {weeks.map((week, weekIndex) => (
                      <div
                        key={weekIndex}
                        className="grid gap-[2px]"
                        style={{ gridTemplateRows: "repeat(7, 1fr)" }}
                      >
                        {Array.from({ length: 7 }).map((_, dayIndex) => {
                          const day = week[dayIndex];
                          if (!day) {
                            return (
                              <div
                                key={dayIndex}
                                className="w-full aspect-square bg-transparent"
                              />
                            );
                          }

                          const dateStr = day.toISOString().split("T")[0];
                          const isInYear =
                            day.getFullYear() === new Date().getFullYear();
                          const taps = isInYear ? tapsMap[dateStr] || 0 : 0;
                          const completed = isInYear && taps > 0;

                          return (
                            <div
                              key={dateStr}
                              title={
                                isInYear
                                  ? `${dateStr} — ${
                                      completed
                                        ? `${taps} tap${
                                            taps > 1 ? "s" : ""
                                          }`
                                        : "No activity"
                                    }`
                                  : ""
                              }
                              className={`rounded-sm border border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-600 transition-colors ${
                                !isInYear ? "opacity-20" : ""
                              }`}
                              style={{
                                backgroundColor:
                                  completed && isInYear
                                    ? generateMonochromaticPalette(
                                        habit.color,
                                        habit.completions,
                                        taps
                                      )
                                    : "#e5e7eb",
                                aspectRatio: "1 / 1",
                                width: "100%",
                              }}
                            />
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Legend */}
                <div className="flex items-center gap-2 mt-4 text-xs text-slate-600 dark:text-slate-400">
                  <span>Less</span>
                  {[0, 0.25, 0.5, 0.75, 1].map((opacity, i) => (
                    <div
                      key={i}
                      className="w-3 h-3 rounded-sm border border-slate-200 dark:border-slate-800"
                      style={{
                        backgroundColor:
                          opacity > 0 ? habit.color : "transparent",
                        opacity: opacity > 0 ? opacity : 1,
                      }}
                    />
                  ))}
                  <span>More</span>
                </div>
              </div>
            </div>
          </Card>
          <div className="p-25"> </div>
          </div>
        );
      })}
    </div>
  );
};

export default HabitGrid;
