export const SignUpApi = async (email, username, password) => {
    try{
        const response = await fetch("http://localhost:5000/auth/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, username, password })
        });

        const res=await response.json();
        console.log(res);

        localStorage.setItem('access_token',res.body.access_token);
        localStorage.setItem('refresh_token',res.body.refresh_token);

        return res.body.message;
    }
    catch (err) {
        console.log(err);
        return err.message;
    }
}

export const LogInApi = async(username, password) => {
    try {
        console.log("Log in API Function called")
        const response=await fetch("http://localhost:5000/auth/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({username, password})
        });
        console.log("Fetch function executed")

        const res=await response.json();
        console.log("Response recieved",res)

        localStorage.setItem('access_token',res.body.access_token);
        localStorage.setItem('refresh_token',res.body.refresh_token);

        console.log(res);
        return res.body.message;
    }
    catch (err) {
       console.log(err);
       return err.message;
    }
}

export const LogOut = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    window.location.reload();
}