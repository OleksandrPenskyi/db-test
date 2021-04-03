import companyInfo from '../templates/company-info.hbs';
import api from './api';
import notification from './notifications';

// ! РЕФАКТ

async function renderCompanyPage(id) {
  const rootRef = document.querySelector('#root'); // ссылка на корень DOMа
  rootRef.innerHTML = ''; // очистить DOM перед рендером новой страницы
  const result = await api.getUserById(id); // получаем все данные пользователя по id
  const markup = companyInfo(result); // делаем разметку по полученным данным
  rootRef.insertAdjacentHTML('afterbegin', markup); // рисуем разметку в DOMe

  // ссылки на Input
  const companyFormRef = document.querySelector('#company-data-form');
  // слушатель на форме
  companyFormRef.addEventListener('submit', event => {
    event.preventDefault();

    let objForPatch = {}; // новый обьект по результат заполнения формы

    // конструктор для сбора инфы с инпута
    const formData = new FormData(companyFormRef);
    // перебираем инфу и записываем в новый обьект
    formData.forEach((value, key) => {
      // если инпут был пустой, то ничего не добавляем в новый объект
      if (value.length >= 1) {
        objForPatch[key] = value;
      }
    });

    // проверка на зполнение хоть бы одного поля в Input, если полученный объект выше пустой, т.е. массив клчей пуст, то return
    if (Object.keys(objForPatch).length < 1) {
      notification.fill(); // нотификация: заполни графы
      return;
    }

    api
      .patch(id, objForPatch) // делаем патч нового обьекта по id текущей записи в debugger.json
      .then(() => {
        return api.getUserById(id); // получаем обовленные данные по данной company
      })
      .then(data => {
        // получаем ссылки на табличку слева
        const nameTableRef = document.querySelector('.js-table-name');
        const countOfEmployeesTableRef = document.querySelector(
          '.js-table-countOfEmployees',
        );
        const emailTableRef = document.querySelector('.js-table-email');
        const websiteTableRef = document.querySelector('.js-table-website');
        const countryTableRef = document.querySelector('.js-table-country');

        // переписываем их новое значение
        nameTableRef.textContent = data[0].name;
        countOfEmployeesTableRef.textContent = data[0].countOfEmployees;
        emailTableRef.textContent = data[0].email;
        websiteTableRef.textContent = data[0].website;
        countryTableRef.textContent = data[0].country;
      })
      .then(() => {
        companyFormRef.reset();
      })
      .then(() => {
        // нотификация об успешном изменении даных
        notification.changed();
      });
  });
}

export default renderCompanyPage;
