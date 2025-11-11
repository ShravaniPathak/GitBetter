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
          <HabitItem key={habit._id} habit={habit} />
        ))}
      </ul>
    </div>
  );
}

function HabitItem({ habit }) {
  const [message, setMessage] = useState("");

  const handleAddTap = async () => {
    try {
      const res = await addTapsAPi(habit._id);
      setMessage(res);
    } catch (err) {
      console.error("Error adding tap:", err);
      setMessage("Failed to update habit");
    }
  };

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
      <p><strong>No. of tap: </strong>{habit.timestamps.taps}</p>
      <button onClick={handleAddTap}>+</button>
      <div>{message}</div>
    </li>
  );
}

export default Dashboard;
