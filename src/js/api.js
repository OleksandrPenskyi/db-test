import axios from 'axios';
import { v4 } from 'uuid';

axios.defaults.baseURL = 'http://localhost:3000/user';

export default {
  async post(
    name,
    country,
    countOfEmployees = '0',
    email = 'none',
    website = 'none',
  ) {
    const headers = {
      id: v4(),
      name,
      country,
      countOfEmployees,
      email,
      website,
    };

    const response = await axios.post('', headers);
    const data = [...response.data]; // возврат массива. Из-за того что наш шаблон ожидает массив (чисто чтобы не менять массив)
    console.log(data);
    return data;
  },

  async patch(id, object) {
    await axios.patch(`/${id}`, object);
  },

  async deleteUser(id) {
    await axios.delete(`/${id}`);
  },

  async getAllUsers() {
    const { data } = await axios.get('');

    return data;
  },

  async getUserById(id) {
    const response = await axios.get(`/${id}`);
    const data = [...response.data]; // возврат массива. Из-за того что наш шаблон ожидает массив (чисто чтобы не менять массив)
    return data;
  },
};
