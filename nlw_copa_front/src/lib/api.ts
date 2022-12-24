import axios from "axios";

const config = {
	baseURL: process.env.NEXT_PUBLIC_BACK_END_API,
};

export const api = axios.create(config);
