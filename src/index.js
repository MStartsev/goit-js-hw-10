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

  const logCountries = name => {
    fetchCountries(name)
      .then(countries => {
        if (countries.length > 10) {
          Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
          return;
        }

        console.log(countries);

        countries.length === 1
          ? createCountryCard(countries)
          : createCountryList(countries);
      })

      .catch(error => console.log(error));
  };

  if (value) logCountries(value);
};

searchBoxEl.addEventListener('input', debounce(searchText, DEBOUNCE_DELAY));

function createCountryList(countries) {
  const list = countries.reduce(
    (arr, { name, flags }) =>
      `${arr}
      <li class='country-element'>
          <img src="${flags.svg}" alt="${flags.alt}" width=30px height=30px>
          <h2>${name.official}<h2>
      </li>
  `,
    ''
  );
  countryInfoEl.innerHTML = '';
  countryListEl.innerHTML = list;
}

function createCountryCard(countries) {
  const languagesList = languages => Object.values(languages).join(', ');

  const list = countries.map(
    ({ name, capital, population, flags, languages }) =>
      `<img src="${flags.svg}" alt="${flags.alt}" width=30px height=30px>
       <h2>${name.official}<h2>
        <ul>
          <li class='country-card'>
          <span>Capital:</span> ${capital}
          </li>
          <li class='country-card'>
          <span>Population:</span> ${population}
          </li>
          <li class='country-card'>
          <span>Languages:</span> ${languagesList(languages)}
          </li>
        </ul>
          `
  );

  countryListEl.innerHTML = '';
  countryInfoEl.innerHTML = list;
}
