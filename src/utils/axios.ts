import axios from 'axios';

export const API = axios.create({
	baseURL: `${process.env.REACT_APP_API_URL}/`,
	headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json',
		'Accept-Language': 'en',
		'Content-Language': 'en',
	},
});

API.interceptors.request.use(
	async function (config) {
		const bearerToken = localStorage.getItem('access_token');
		config.headers['Authorization'] = `Bearer ${bearerToken}`;
		return config;
	},
	function (error) {
		return Promise.reject(error);
	},
);

API.interceptors.response.use(
	function (response) {
		return response;
	},
	async function (error) {
		if (error.response) {
			const errorCode = error.response.status;
			if (errorCode === 401) {
				console.log(error.response);
			}
		}
		return Promise.reject(error);
	},
);