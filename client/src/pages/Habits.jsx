import React, { useState, useContext } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createHabitApi } from "../api/habitApi";
import { AuthContext } from "../context/AuthProvider.jsx";
import Logout from "../components/Logout.jsx";

export default function Habits({onHabitCreated}) {
  const { access_token, loading, isAuthenticated } = useContext(AuthContext);

  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("#A61212");
  const [goal, setGoal] = useState("Daily");
  const [completions, setCompletions] = useState(1);
  const [message, setMessage] = useState("");

  const colorOptions = [
    "#BD2222",
    "#F5811B",
    "#004D40",
    "#191970",
    "#8524A6",
    "#008080",
    "#BE3144",
    "#E86320",
    "#800020",
    "#915119",
  ];

  const handleCreateHabit = async (e) => {
    e.preventDefault();
    const res = await createHabitApi(name, description, color, goal, completions);
    setMessage(res);
    setName("");
    setDescription("");
    setCompletions(1);
    setColor("#A61212");
    setGoal("Daily");
    setOpen(false);

    if (onHabitCreated) onHabitCreated();
  };

  const option= (goal) => {
    if (goal==="Daily") {
      return "Day"
    }
    else if (goal==="Weekly")
    {
      return "Week"
    }
    else {
      return "Month"
    }
  }

  return (
    <>
      <Logout />
      <div className="fixed top-4 right-4">
        <Button onClick={() => setOpen(true)} className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
          + Add New Habit
        </Button>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent
            className="
              sm:max-w-md
              bg-white
              rounded-xl
              shadow-xl
              p-6
              flex
              flex-col
              items-center
              justify-center
              space-y-4
              px-10
              py-6
            "
          >
            <DialogHeader className="text-center">
              <DialogTitle className="text-xl font-semibold text-gray-800">
                Create a New Habit
              </DialogTitle>
              <DialogDescription>
                Define your habit goal, color, and completion target.
              </DialogDescription>
            </DialogHeader>

            <form
              onSubmit={handleCreateHabit}
              className="w-full flex flex-col gap-5 mt-2 pl-4"
            >
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Habit Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., Morning Exercise"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full"
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  placeholder="Short description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  className="w-full"
                />
              </div>

              {/* Color Picker */}
              <div className="space-y-2">
                <Label>Choose a Color</Label>
                <div className="flex flex-wrap gap-2 justify-center">
                  {colorOptions.map((c) => (
                    <button
                      key={c}
                      type="button"
                      className={`w-8 h-8 rounded-md border-2 transition-transform hover:scale-110 ${
                        color === c ? "border-black" : "border-gray-200"
                      }`}
                      style={{ backgroundColor: c }}
                      onClick={() => setColor(c)}
                    />
                  ))}
                </div>
              </div>

              {/* Goal */}
              <div className="space-y-2 py-52">
                <Label htmlFor="goal">Goal Type</Label>
                <Select value={goal} onValueChange={setGoal}>
                  <SelectTrigger id="goal" className="w-full">
                    <SelectValue placeholder="Select Goal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Daily">Daily</SelectItem>
                    <SelectItem value="Weekly">Weekly</SelectItem>
                    <SelectItem value="Monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Completions */}
              <div className="space-y-2 text-center">
                <Label>Completions per {option(goal)}</Label>
                <div className="flex items-center justify-center gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      setCompletions((prev) => Math.max(1, prev - 1))
                    }
                  >
                    -
                  </Button>
                  <span className="text-lg font-semibold">{completions}</span>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => setCompletions((prev) => prev + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>

              {/* Footer */}
              <DialogFooter className="flex justify-between pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={!name.trim() || !description.trim()}
                >
                  Create Habit
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Message */}
        {message && (
          <div className="mt-4 text-green-600 font-semibold text-center bg-white p-3 rounded-md shadow">
            {message}
          </div>
        )}
      </div>
    </>
  );
}
