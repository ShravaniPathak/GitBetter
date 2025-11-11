import React, { useState, useEffect } from "react";
import { fetchHabitApi, addTapsAPi } from "../api/habitApi.js";

function Dashboard() {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

    getHabits();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) return <div>Loading habits...</div>;
  if (habits.length === 0) return <div>No habits found</div>;

  return (
    <div>
      <h2>My Habits</h2>
      <ul>
        {habits.map((habit) => (
          <HabitItem key={habit._id} habit={habit} setHabits={setHabits} habits={habits} />
        ))}
      </ul>
    </div>
  );
}

function HabitItem({ habit, setHabits, habits }) {
  const [message, setMessage] = useState("");

  const getCurrentPeriod = () => {
    const now = new Date();
    return habit.timestamps.find(
      (t) => new Date(t.startDate) <= now && new Date(t.endDate) >= now
    );
  };

  const handleAddTap = async () => {
    try {
      const res = await addTapsAPi(habit._id); 
      setMessage(res.body.message);

      const updatedHabits = habits.map((h) => {
        if (h._id === habit._id) {
          return res.body.habit; 
        }
        return h;
      });
      setHabits(updatedHabits);
    } catch (err) {
      console.error("Error adding tap:", err);
      setMessage("Failed to update habit");
    }
  };

  const currentPeriod = getCurrentPeriod();
  const totalTaps = currentPeriod ? currentPeriod.totalTaps : 0;

  return (
    <li
      style={{
        border: `2px solid ${habit.color}`,
        padding: "10px",
        marginBottom: "10px",
      }}
    >
      <h3>{habit.name}</h3>
      <p><strong>Description:</strong> {habit.description || "No description"}</p>
      <p><strong>Goal:</strong> {habit.goal}</p>
      <p><strong>Max no. of Completions:</strong> {habit.completions}</p>
      <p><strong>No. of taps:</strong> {totalTaps}</p>
      <button onClick={handleAddTap}>+</button>
      <div>{message}</div>
    </li>
  );
}

export default Dashboard;
