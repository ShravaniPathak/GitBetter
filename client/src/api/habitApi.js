const access_token=localStorage.getItem('access_token');
const refresh_token=localStorage.getItem('refresh_token');

export const createHabitApi = async (name, description, color, goal, completions) => {
    try {

        const response=await fetch("http://localhost:5000/habit/create", {
            method: "POST",
            headers: {"Content-Type": "application/json",
                "authorization": "Bearer "+access_token,
                "x_refresh_token": refresh_token
            },
            body: JSON.stringify({name, description, color, goal, completions})
        })

        const res=await response.json();

        console.log(res);
        return res.body.message;
    }
    catch (err) {
        console.log(err);
        return err.message;
    }
}

export const fetchHabitApi = async() => {
    try {
        const response = await fetch("http://localhost:5000/habit/fetch", {
            method: "POST",
            headers: {"Content-Type": "application/json",
                    "authorization": "Bearer "+access_token,
                    "x_refresh_token": refresh_token
            },
        })

        const res=await response.json()
        console.log(res);
        console.log(res.body.habits);
        return res.body.habits;
    } catch (err) {
        console.log(err);
        return err;
    }
}

export const addTapsAPi = async(habitId) => {
    const response=await fetch("http://localhost:5000/habit/addTaps", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({habitId})
    });

    const res=await response.json();

    if (res.success){
        return res.body.message;
    }

    else {
        return "Oops! Something went wrong!"
    }
}