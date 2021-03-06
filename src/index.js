import renderMarkup from './templates/country-list-markup.hbs';
import countryInfoMarkup from './templates/country-info-markup.hbs';
import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
import render from './js-components/render-card';
import Countries from './js-components/search-service';

const refs = {
  input: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

const dataToRender = {
  list: refs.countryList,
  properties: refs.countryInfo,
  listMarkup: renderMarkup,
  propertiesMarkup: countryInfoMarkup,
};

const DEBOUNCE_DELAY = 300;

function onTextInput(e) {
  const value = e.target.value.trim();

  dataToRender.list.innerHTML = '';
  dataToRender.properties.innerHTML = '';

  if (!value) {
    return;
  }

  const countries = new Countries(value);

  countries
    .getCounrty()
    .then(response => {
      if (response.length > 10) {
        return Notify.info('Too many matches found. Please enter a more specific name.');
      }

      dataToRender.data = response;

      render(dataToRender);
    })
    .catch(() => Notify.failure('Oops, there is no country with that name'));
}

refs.input.addEventListener('input', debounce(onTextInput, DEBOUNCE_DELAY));

// ===================================================================

Notify.init({
  width: '425px',
  fontSize: '24px',
  timeout: 3000,
  borderRadius: '10px',
});
