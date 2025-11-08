{/*const {name, description, color, goal, completions}=req.body*/}
export const createHabitAPi = async (name, description, color, goal, completions) => {
    try {
        const access_token=localStorage.getItem('access_token');

        const response=await fetch("http://localhost:5000/habit/create", {
            method: "POST",
            headers: {"Content-Type": "application/json",
                "authorization": "Bearer "+access_token
            },
            body: JSON.stringify({name, description, color, goal, completions})
        })

        const res=await response.json();

        console.log(res);
        return res.body.message;
    }
    catch (err) {
        console.log(err);
        return res.body.message;
    }
}