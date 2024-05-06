import axios from "axios";

export default async function submitForm(url, data) {
    return (await axios.post(url, data, { withCredentials: true })).data
}