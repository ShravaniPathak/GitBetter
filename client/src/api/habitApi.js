export const createHabitApi = async (name, description, color, goal, completions) => {
    try {
        const access_token=localStorage.getItem('access_token');
        const refresh_token=localStorage.getItem('refresh_token');

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