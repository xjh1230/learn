// import axios from "@/utils/request";
const mp = new Map();

export function login(data) {
    // return axios.post("/user/login", data);
    return new Promise((reslove, reject) => {
        setTimeout(() => {
            let tick = new Date().getTime().toString();
            mp.set(tick, [data.userName]);
            return {
                data: new Date().getTime(),
            };
        }, 100);
    });
}

export function getInfo(token) {
    return new Promise((reslove, reject) => {
        setTimeout(() => {
            return mp.get(token);
        }, 100);
    });
}