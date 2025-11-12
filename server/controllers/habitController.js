import Habits from '../models/Habits.js'
import { getPeriodRange } from '../utils/habitUtils.js';

export const createHabit = async (req, res) => {
    try {
        const {name, description, color, goal, completions}=req.body;
        const user=req.user
        const userId=user._id;

        const habit = new Habits({
            user: userId,
            name, 
            description,
            color,
            goal,
            completions,
            timestamps: []
        });

        await habit.save()

        return res.json({
            body: {
                message: "Habit created"
            },
            success: true
        })
    }
    catch (err) {
        console.log(err)
        return res.json({
            body: {
                message: err.message
            },
            success: false
        })
    }
}


export const fetchHabit = async(req, res) => {
    try {
    const user=req.user;
    const userId=user._id;
    const habits=await Habits.find({user: userId});
    console.log(habits)
    res.json({
        body: {
            message: "Habits fetched successfully",
            habits
        },
        success: true
    });
    }
    catch (err)
    {
        console.log(err)
        res.json({
            body: {
                message: err.message
            },
            success: false
        })
    }
}

export const addTaps = async (req, res) => {
  try {
    const { habitId } = req.body;
    const habit = await Habits.findById(habitId);

    if (!habit) {
      return res.status(404).json({
        success: false,
        body: { message: "Habit not found" },
      });
    }

    const goal = habit.goal;
    const maxTaps = habit.completions;
    const today = new Date().toISOString().split("T")[0]; 

    const { start, end } = getPeriodRange(goal); 
    let message = "Congrats on taking a productive step towards your goal!";

    let periodStamp = habit.timestamps.find(
      t => t.startDate <= new Date() && t.endDate >= new Date()
    );

    if (periodStamp) {
      if (periodStamp.totalTaps >= maxTaps) {
        message = "No. of taps exceeding max amount";
      } else {
        periodStamp.totalTaps += 1;

        const todayTaps = periodStamp.tapsPerDay.get(today) || 0;
        periodStamp.tapsPerDay.set(today, todayTaps + 1);

        if (periodStamp.totalTaps === maxTaps) {
          message = "Congrats on successfully achieving your goal!";
        }
      }
    } else {
      const periodType = goal.toLowerCase();
      periodStamp = {
        periodType,
        startDate: start,
        endDate: end,
        totalTaps: 1,
        tapsPerDay: new Map([[today, 1]]),
      };
      habit.timestamps.push(periodStamp);
    }

    await habit.save();

    return res.json({
      success: true,
      body: {
        message,
        habit,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      body: {
        message: error.message,
      },
    });
  }
};

export const deleteHabit = async (req, res) => {
  try {
  const {habitId}=req.body;

  const del = await Habits.findByIdAndDelete(habitId)

  return res.json({
    body : {
      message: "Successfully deleted habit"
    },
    success: true
  })
  }
  catch (error) 
  {
    console.log(error);
    return res.json({
      body: {
        message: error.message,

      }
    })
  }
}
