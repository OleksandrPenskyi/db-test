// отрисовует в DOM все, что содержится в db.json
import api from './api'; // обьект с методами для работы с HTTP запросами
import allUsers from '../templates/userList.hbs'; // шаблон

async function renderDatabaseData(userListRef) {
  const result = await api.getAllUsers(); // получение всех компаний с db.json
  const markup = allUsers(result); // вызов шаблона handlebars
  userListRef.insertAdjacentHTML('beforeend', markup); // рендер разметку в UL
}

export default renderDatabaseData;
