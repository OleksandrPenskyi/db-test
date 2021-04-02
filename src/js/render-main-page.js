import mainPage from '../templates/mainPage.hbs'; // шаблон основной страницы

const rootRef = document.querySelector('#root'); // ссылка на корень DOMа

// рендерим разметку основной страницы
function renderMainPage() {
  const markup = mainPage();
  rootRef.insertAdjacentHTML('afterbegin', markup);
}

export default renderMainPage;
