import axios from 'axios';
const ROOT_URL = 'http://scrambled-data.com:3000/api'

export const DO_LOGIN = 'do_login';
export const DO_REGISTER = 'do_register';

export function doLogin (values) {

	//https://www.udemy.com/react-redux/learn/v4/t/lecture/6946620?start=0
	const request = axios.post( `${ROOT_URL}/authenticate/`, values );

	return {
		type: DO_LOGIN, 
		payload: request
	}

}

export function doRegister (values) {

	//https://www.udemy.com/react-redux/learn/v4/t/lecture/6946620?start=0
	const req = {
		method: 'post',
		url: `${ROOT_URL}/register/`,
		data: {
		  email: values.email,
		  password: values.password
		}
     }
     console.log(req);
	const request = axios(req);

	return {
		type: DO_REGISTER,
		payload: request
	}

}