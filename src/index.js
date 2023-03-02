import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './js/fetchCountries';

import 'notiflix/dist/notiflix-3.2.6.min.css';
import './css/styles.css';

const DEBOUNCE_DELAY = 300;

const searchBoxEl = document.querySelector('#search-box');
const countryListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');

const searchText = () => {
  const value = searchBoxEl.value.trim();
  searchBoxEl.value = value;
  console.log(value);
  console.log(value);

  function logCountries(name) {
    fetchCountries(name)
      .then(countries => {
        console.log(countries);
        createCountryList(countries);
      })
      .catch(error => console.error(error));
  }

  logCountries(value);
};

searchBoxEl.addEventListener('input', debounce(searchText, DEBOUNCE_DELAY));

function createCountryList(countries) {
  const markup = countries
    .map(
      ({ name, flags }) =>
        `<li class='country-element'>
            <img src="${flags.svg}" alt="${flags.alt}" width=30px height=30px>
            <h2>${name.official}<h2>
        </li>`
    )
    .join('');
  console.log(markup);

  countryListEl.innerHTML = markup;
}
