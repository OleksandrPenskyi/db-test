import api from './js/api';
import allUsers from './templates/userList.hbs';
import renderMainPage from './js/render-main-page'; // рендерим разметку основной страницы
import renderDatabaseData from './js/render-DB-data'; // рендерим разметку всего в DOM всего, что содержится в db.json
import renderCompanyPage from './js/render-company-page'; // рендерим страницу компании для изменений

import './styles.scss'; // импорт стилей

renderMainPage(); // todo рендерим разметку основной страницы

const userListRef = document.querySelector('#userList'); // ссылка на UL для рендера компаний с DB.json
const formRef = document.querySelector('#form'); // ссылку на form, которая появляется после рендера основной страницы - renderHtmlPage()

renderDatabaseData(userListRef); // todo рендерим разметку всего в DOM всего, что содержится в db.json

/*
 *
 *
 *
 */

// слушатель на форме
formRef.addEventListener('submit', onSubmitForm);
// обработчик на форме
function onSubmitForm(event) {
  event.preventDefault(); // сброс стандартных настроек браузера
  getInputValue(event); // получение данных с Input
}
// получаем данные с Input и делаем разметку
async function getInputValue(event) {
  const inputValue = event.currentTarget.elements;
  const companyName = inputValue.name.value;
  const country = inputValue.location.value;
  formRef.reset(); // очистка формы после получения инфы

  const result = await api.post(companyName, country);
  const markup = allUsers(result);
  userListRef.insertAdjacentHTML('beforeend', markup);
}

/*
 *
 *
 *
 */

// слушатель на списке компаний
userListRef.addEventListener('click', onManageWithCompany);

async function onManageWithCompany(event) {
  event.preventDefault(); // сброс стандартных настроек браузера

  const id = event.target.dataset.id; // получаем id той Company по которой клацаем либо в кнопку, либо в p

  // Если клацнули по 'BUTTON', то удаляем всю кнопку
  if (event.target.nodeName === 'BUTTON') {
    await api.deleteUser(id); // по полученному id удаляем элемента из db.json
    const result = await api.getAllUsers(); // запрашиваеем обновленный список пользователей из db.json
    const markup = allUsers(result); // вызов шаблона handlebars
    userListRef.innerHTML = markup; // рендерим разметку с нуля
  }

  // Если клацнули по 'P', то рендерим новую разметку
  if (event.target.nodeName === 'P') {
    renderCompanyPage(id);
  }
}

/*
 *
 *
 *
 */
