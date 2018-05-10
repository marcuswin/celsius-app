import axios from 'axios';
import apiUrl from './api-url';


const countriesService = {
  get,
};


function get() {
  return axios.get(`${apiUrl}/countries`);
}


export default countriesService;