import axios from 'axios';



const createResource = (api, data) => {
	return new Promise((resolve, reject) => {
		axios
			.post(`${api}`, data,)
			.then(response => {
				resolve(response);
			})
			.catch(error => {
				reject(error);
			});
	});
};

const getResource = api => {
	return new Promise((resolve, reject) => {
		axios
			.get(`${api}`, { headers: { 'xt-user-token': null } })
			.then(response => {
				resolve(response);
			})
			.catch(error => {
				reject(error);
			});
	});
};

const forgotPasswordResource = (api, data) => {
	return new Promise((resolve, reject) => {
		axios
			.post(`${api}`, data, { headers: { 'xt-client-token': null } })
			.then(response => {
				resolve(response);
			})
			.catch(error => {
				reject(error);
			});
	});
};


export {
	createResource,
	getResource,
	forgotPasswordResource,
};
