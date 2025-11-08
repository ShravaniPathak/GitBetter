import React, { useState } from "react";
import { createHabitApi } from "../api/habitApi";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthProvider.jsx";
import Logout from "../components/Logout.jsx";

function Habits() {
  const {access_token, loading, isAuthenticated}=useContext(AuthContext);
  useEffect(() => {
    console.log(access_token);
    console.log(loading);
    console.log(isAuthenticated);
  })
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("#A61212");
  const [goal, setGoal] = useState("Daily");
  const [completions, setCompletions] = useState(1);
  const [message, setMessage] = useState("");

  const colorOptions = [
    "#A61212", "#E67E22", "#F1C40F", "#27AE60",
    "#2980B9", "#8E44AD", "#2C3E50", "#D35400",
    "#1ABC9C", "#C0392B"
  ];

  const handleCreateHabit = async () => {
    const res = await createHabitApi(name, description, color, goal, completions);
    setMessage(res);
  };

  return (
    <>
    <Logout />
    <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-xl p-6 font-sans">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Create a New Habit
      </h2>

      {/* Name */}
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-1">Name</label>
        <input
          type="text"
          required
          placeholder="Enter Habit Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Description */}
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-1">Description</label>
        <input
          type="text"
          required
          placeholder="Enter Habit Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Color Grid */}
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Choose Color</label>
        <div className="grid grid-cols-5 gap-3">
          {colorOptions.map((c) => (
            <div
              key={c}
              onClick={() => setColor(c)}
              className={`w-8 h-8 rounded-md cursor-pointer transition-transform transform hover:scale-110 border-2 ${
                color === c ? "border-black" : "border-gray-300"
              }`}
              style={{ backgroundColor: c }}
            ></div>
          ))}
        </div>
      </div>

      {/* Goal Dropdown */}
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-1">Goal</label>
        <select
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="Daily">Daily</option>
          <option value="Weekly">Weekly</option>
          <option value="Monthly">Monthly</option>
        </select>
      </div>

      {/* Completions */}
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-1">Completions</label>
        <div className="flex items-center justify-between bg-gray-100 rounded-md px-4 py-2">
          <span className="text-gray-800 font-medium">
            {completions} / per {goal.slice(0, -2)}
          </span>
          <button
            onClick={() => setCompletions(completions + 1)}
            className="bg-green-500 hover:bg-green-600 text-white font-bold rounded-md px-3 py-1 text-lg transition-colors"
          >
            +
          </button>
        </div>
      </div>

      {/* Submit */}
      <button
        onClick={handleCreateHabit}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-md transition-colors"
      >
        Create Habit
      </button>

      {/* Message */}
      {message && (
        <div className="text-green-600 font-semibold text-center mt-4">{message}</div>
      )}
    </div>
    </>
  );
}

export default Habits;
