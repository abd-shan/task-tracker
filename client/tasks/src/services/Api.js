import axios from "axios";


 //create base url and time out

const api = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 10000,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    }
});


export default api;
