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

{/*name, description, color, goal, completions*/}

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

export const addTaps = async(req, res) => {
    try {
        const {habitId} = req.body;
        const habit=await Habits.findById(habitId);

        const goal=habit.goal;
        const maxTaps=habit.completions;
        const {start, end}=getPeriodRange(goal);
        let message="Congrats of taking a productive step towards your goal!";

        const stamp = habit.timestamps.find(t => t.startDate >= start && t.endDate <= end);

        if (stamp) {
            if(stamp.taps>=maxTaps) {
                message="No. of taps exceeding max amount"
                return res.json({
                    body : {
                        message,
                        habit
                    },
                    success: true
                })
            }

            stamp.taps+=1;
            if (stamp.taps==maxTaps)
            {
                message="Congrats on successfully achieving your goal!"
            }
        }

        else {
            const periodType=goal.toLowerCase()
            habit.timestamps.push({
            startDate: start,
            endDate: end,
            periodType, 
            taps: 1
            });
        }

        await habit.save();

        return res.json({
            body: {
                message,
                habit
            },
            success: true
        })
 
    }
    catch (error) {
        console.log(error);
        return res.json({
            body: {
                message: error.message,
            },
            success: false
        })
    }

}