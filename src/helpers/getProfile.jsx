import { Global } from "./Global";

const token = localStorage.getItem("token");

export const getProfile = async(userId, setState) => {
    const request = await fetch(Global.url + "user/profile/" + userId, {
        method: "GET",
        headers: {
            "Content-Type" : "application/json",
            "authorization" : token
        }
    })
    const data = await request.json();
    if(data.status == "success"){
        setState(data.user)
    }

    return data
}