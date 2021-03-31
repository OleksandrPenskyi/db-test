import axios from 'axios';
import { v4 } from 'uuid';

axios.defaults.baseURL = 'http://localhost:3000/user';

export default {
  async post(name, age) {
    const headers = {
      id: v4(),
      name: name,
      age: age,
    };
    const { data } = await axios.post('', headers);
    return data;
  },

  // async patch(nnpame, age) {
  //     const headers = {
  //         id: v4(),
  //         name: name,
  //         age: age
  //     }
  //     const { data } = await axios.post('', headers);
  //     console.log(data);
  //     return data

  // },

  async deleteUser(id) {
    await axios.delete(`/${id}`);
  },

  async getAllUsers() {
    const { data } = await axios.get('');
    return data;
  },

  async getUserById(id) {
    const { data } = await axios.get(`/${id}`);
    console.log(data);
    return data;
  },
};
