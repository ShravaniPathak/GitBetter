import React, { useState, useEffect } from "react";
import { fetchHabitApi, addTapsAPi } from "../api/habitApi.js";
import Habits from "./Habits.jsx";
import HabitGrid from "@/components/ContributionGrid.jsx";

function Dashboard() {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(0);

  let isMounted = true;

  const getHabits = async () => {
    try {
      const res = await fetchHabitApi();
      if (isMounted) {
        setHabits(res);
      }
    } catch (err) {
      console.error("Error fetching habits:", err);
    } finally {
      if (isMounted) setLoading(false);
    }
  };

  const onUpdate = () => {
    getHabits();
  };

  const handleDeleteHabit = (deletedId) => {
    setHabits((prev) => prev.filter((h) => h._id !== deletedId));
  };

  useEffect(() => {
    getHabits();
    return () => {
      isMounted = false;
    };
  }, [reload]);

  if (loading)
    return <div className="text-center py-6 text-gray-600">Loading habits...</div>;

  if (habits.length === 0)
    return <div className="text-center py-6 text-gray-600">No habits found</div>;

  return (
<div className="w-full flex justify-center px-4">
  <div className="max-w-5xl w-full">
      <Habits onHabitCreated={() => setReload(reload + 1)} />

      <h2 className="text-2xl font-bold mt-6 mb-4">My Habits</h2>

      <ul className="space-y-4">
        <HabitGrid
          habits={habits}
          onUpdate={onUpdate}
          onDelete={handleDeleteHabit}
        />
      </ul>
    </div>
    </div>
  );
}

export default Dashboard;
