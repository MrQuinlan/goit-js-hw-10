import renderMarkup from './templates/country-list-markup.hbs';
import countryInfoMarkup from './templates/country-info-markup.hbs';
import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';

const refs = {
  input: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

const DEBOUNCE_DELAY = 300;
const url = 'https://restcountries.com/v3.1/name';

function onTextInput(e) {
  const value = e.target.value;

  refs.countryList.innerHTML = '';

  if (!value) {
    return;
  }

  getCounrty(value);

  return e.target.value;
}

function getCounrty(countryName) {
  fetch(`${url}/${countryName}?fields=name,capital,population,flags,languages`)
    .then(response => {
      if (response.status === 404) {
        throw new Error();
      }

      return response.json();
    })

    .then(response => {
      if (response.length > 10) {
        return Notify.info('Too many matches found. Please enter a more specific name.');
      }

      renderCard(response);
    })
    .catch(() => Notify.failure('Oops, there is no country with that name'));
}

function renderCard(data) {
  refs.countryList.insertAdjacentHTML('beforeend', renderMarkup(data));

  if (data.length === 1) {
    refs.countryList.insertAdjacentHTML('beforeend', countryInfoMarkup(data));
  }
}

refs.input.addEventListener('input', debounce(onTextInput, DEBOUNCE_DELAY));

Notify.init({
  width: '425px',
  fontSize: '24px',
  timeout: 3000,
  borderRadius: '10px',
});
