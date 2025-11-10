import React, { useState, useEffect } from "react";
import { fetchHabitApi, addTapsAPi } from "../api/habitApi.js";

function Dashboard() {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let isMounted = true;

    const getHabits = async () => {
      try {
        const res = await fetchHabitApi();
        if (isMounted) {
          setHabits(res); // assumes your API returns { success, body: { habits } }
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
          <li key={habit._id} style={{ border: `2px solid ${habit.color}`, padding: "10px", marginBottom: "10px" }}>
            <h3>{habit.name}</h3>
            <p><strong>Description:</strong> {habit.description || "No description"}</p>
            <p><strong>Goal:</strong> {habit.goal}</p>
            <p><strong>Completions:</strong> {habit.completions}</p>
            <button onClick={async e=> {
              const res=await addTapsAPi(habit._id)
              setMessage(res);
            }}>+</button>
            <div>{message}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
