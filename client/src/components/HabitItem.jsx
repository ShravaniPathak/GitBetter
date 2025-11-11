import React, { useState } from "react";
import { addTapsAPi } from "../api/habitApi.js";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card.jsx";
import { Button } from "./ui/button.jsx";
import { Trash2 } from "lucide-react";

export default function HabitItem({ habit }) {
  const [currentTaps, setCurrentTaps] = useState(() => {
    const last = habit.timestamps?.at(-1);
    return last?.taps || 0;
  });

  const handleTap = async () => {
    try {
      const res = await addTapsAPi(habit._id);
      const last = res.updatedHabit?.timestamps?.at(-1);
      setCurrentTaps(last?.taps ?? currentTaps + 1);
    } catch (e) {
      console.error("Error adding tap");
    }
  };

  return (
    <Card className="rounded-xl shadow-sm border p-4">
      <CardHeader className="flex flex-row justify-between items-start">
        <div>
          <CardTitle className="flex items-center gap-2 text-lg">
            <span
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: habit.color || "#22c55e" }}
            ></span>
            {habit.name}
          </CardTitle>
          <p className="text-sm text-gray-500">Daily Goal</p>
        </div>

        <Trash2 className="text-gray-300 hover:text-red-500 cursor-pointer" size={18} />
      </CardHeader>

      <CardContent>
        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-4 my-4">
          <StatBox title="This Week" value="2" />
          <StatBox title="This Month" value="9" />
          <StatBox title="Total" value="9" />
          <StatBox title="Current Streak" value="3 days" />
        </div>

        {/* Months Row */}
        <div className="flex justify-between text-xs text-gray-500 mb-4 px-2">
          {["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].map(m => (
            <span key={m}>{m}</span>
          ))}
        </div>

        {/* GitHub-style grid */}
        <div className="flex gap-1 mb-4 ml-10">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="h-3 w-3 rounded-sm bg-green-200"></div>
          ))}
        </div>

        {/* Add Tap Button */}
        <Button onClick={handleTap} className="bg-green-600 text-white">
          + Add Tap ({currentTaps})
        </Button>
      </CardContent>
    </Card>
  );
}

function StatBox({ title, value }) {
  return (
    <div className="rounded-lg bg-gray-50 p-3">
      <p className="text-xs text-gray-500">{title}</p>
      <p className="text-lg font-semibold mt-1">{value}</p>
    </div>
  );
}
