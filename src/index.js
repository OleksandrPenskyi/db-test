import api from './js/api';
import { userListRef, formRef } from './js/refs';
import allUsers from './templates/userList.hbs';
import changeBackgroundColor from './js/changeBackgroundColor';

import './styles.css';

(async function makeMarkup() {
  const result = await api.getAllUsers();
  const markup = allUsers(result);
  await addToHTML(markup); // добавление разметки в HTML
})();

async function addToHTML(markup) {
  await userListRef.insertAdjacentHTML('beforeend', markup);
  changeBackgroundColor(); // смена цвета каждой li
}

formRef.addEventListener('submit', event => {
  event.preventDefault(); // сброс стандартных настроек браузера

  getInputValue(event); // получение данных с Input
});

async function getInputValue(event) {
  const inputValue = event.currentTarget.elements;
  const userName = inputValue.userName.value;
  const userAge = inputValue.userAge.value;

  const result = await api.post(userName, userAge);
  const markup = allUsers([result]);
  addToHTML(markup);
}
