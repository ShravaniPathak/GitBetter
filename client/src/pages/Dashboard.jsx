import React, { useState, useEffect, useContext } from "react";
import { fetchHabitApi, addTapsAPi } from "../api/habitApi.js";
import Habits from "./Habits.jsx";
import HabitGrid from "@/components/ContributionGrid.jsx";
import Logout from "../components/Logout.jsx";

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
  return (
    <div className="flex! items-center! justify-center! py-12!">
      <div className="flex! items-center! justify-center! space-x-2!">
        <div className="w-8! h-8! border-4! border-t-4! border-solid! border-gray-300! rounded-full! animate-spin!"></div>
        <div className="text-gray-600! text-xl! font-semibold!">Loading habits...</div>
      </div>
    </div>
  );

if (habits.length === 0)
  return (
    <>
      <Logout />
      <Habits onHabitCreated={() => setReload(reload + 1)} />
      <div className="flex! flex-col! items-center! justify-center! py-12! mt-20!">
        <div className="text-center! text-xl! sm:text-2xl! font-semibold! text-gray-600! mb-6!">
          <span className="block!">Create your first habit today</span>
          <span className="text-sm! text-gray-400!">Start building positive habits and see your progress grow!</span>
        </div>
      </div>
    </>
  );

  return (
  <div className="w-full flex justify-center px-4 bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
    <div className="max-w-5xl w-full ">
      <Logout />
      <Habits onHabitCreated={() => setReload(reload + 1)} />

      <div className="mb-8 text-left">
        <h1 className="text-slate-900 dark:text-slate-50 m-2! text-xl font-bold! mt-8!">
          Habit Tracker
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-base m-2! mb-3!">
          Track your daily habits with GitHub-style contribution grids
        </p>
      </div>

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
