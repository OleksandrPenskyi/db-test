import companyInfo from '../templates/company-info.hbs';
import api from './api';

async function renderCompanyPage(id) {
  const rootRef = document.querySelector('#root'); // ссылка на корень DOMа
  rootRef.innerHTML = ''; // очистить DOM перед рендером новой страницы

  const result = await api.getUserById(id);

  const markup = companyInfo(result);
  rootRef.insertAdjacentHTML('afterbegin', markup);
}

export default renderCompanyPage;
