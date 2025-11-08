import Habits from '../models/Habits.js'

export const createHabit = async (req, res) => {
    try {
        const {name, description, color, goal, completions}=req.body;

        const habit = new Habits({
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