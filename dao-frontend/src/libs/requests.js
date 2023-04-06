import axios from "axios";
import { toast } from "react-toastify";
import { API_SERVER } from "./utils";


class AuthRequest {

    endpoint = null
    config = null

    constructor(endpoint) {
        this.endpoint = endpoint
        this.config = {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("auth-token")}`
            }
        }
    }

    async post(data) {
        try {
            const res = await axios.post(`${API_SERVER}${this.endpoint}`, data, this.config)

            return res
        } catch (e) {

            throw new Error('An error occurred');
        }
    }



}

export default AuthRequest