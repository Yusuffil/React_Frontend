import axios from 'axios';
import { useSSR } from 'react-i18next';

export const signup = (body) =>{
    return axios.post('/api/1.0/users', body,{ headers : { 'accept-languages' : 'tr, en'}});
};
export const login = creds=>{
    {
    return axios.post('/api/1.0/auth', {}, { auth: creds});
    };
};
export const changeLanguage = language => {
    axios.defaults.headers['accept-language'] = language;
}