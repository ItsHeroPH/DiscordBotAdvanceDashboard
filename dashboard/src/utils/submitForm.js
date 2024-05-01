import axios from "axios";

export default async function submitForm(url, data) {
    await axios.post(url, data, { withCredentials: true })
}