import api from './js/api';
import { userListRef, formRef } from './js/refs';
import allUsers from './templates/userList.hbs';
import changeBackgroundColor from './js/changeBackgroundColor';

import './styles.css';

formRef.addEventListener('submit', onSubmitForm);
userListRef.addEventListener('click', onDeleteMarkup);

function onSubmitForm(event) {
  event.preventDefault(); // сброс стандартных настроек браузера
  getInputValue(event); // получение данных с Input
}

async function onDeleteMarkup(event) {
  event.preventDefault(); // сброс стандартных настроек браузера

  // Если клацнули по 'BUTTON', то
  if (event.target.nodeName === 'BUTTON') {
    const id = event.target.dataset.id; // получаем id того элемента в котором нахоидтся эта кнопка
    await api.deleteUser(id); // по полученному id удаляем элемента из db.json
    const result = await api.getAllUsers(); // запрашиваеем обновленный список пользователей из db.json
    const markup = allUsers(result); // вызов шаблона handlebars
    userListRef.innerHTML = markup; // рендерим разметку с нуля
    changeBackgroundColor(); // меняем цвета рамок каждой li
  }
}

// отрисовует в DOM все, что содержится в db.json
(async function makeMarkup() {
  const result = await api.getAllUsers();
  const markup = allUsers(result); // вызов шаблона handlebars
  await addToHTML(markup); // добавление разметки в HTML
})();

async function addToHTML(markup) {
  await userListRef.insertAdjacentHTML('beforeend', markup);
  changeBackgroundColor(); // меняем цвета рамок каждой li
}

// получаем данные с Input и делаем разметку
async function getInputValue(event) {
  const inputValue = event.currentTarget.elements;
  const userName = inputValue.userName.value;
  const userAge = inputValue.userAge.value;

  const result = await api.post(userName, userAge);
  const markup = allUsers([result]);
  addToHTML(markup);
}
