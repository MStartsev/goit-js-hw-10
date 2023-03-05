import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './js/fetchCountries';

import 'notiflix/dist/notiflix-3.2.6.min.css';
import './css/styles.css';

const DEBOUNCE_DELAY = 300;

const searchElements = {
  searchBox: '#search-box',
  countryList: '.country-list',
  countryInfo: '.country-info',
};
const { countryList, countryInfo } = searchElements;

const searchEl = elements =>
  Object.entries(elements).reduce((arr, [key, value]) => {
    arr[`${key}El`] = document.querySelector(value);
    return arr;
  }, {});

const { searchBoxEl, countryListEl, countryInfoEl } = searchEl(searchElements);

const searchText = () => {
  const value = searchBoxEl.value.trim();

  const logCountries = name => {
    fetchCountries(name)
      .then(countries => {
        if (countries.length > 10) {
          Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
          return;
        }

        createCountryList(countries);
        if (countries.length === 1) createCountryCard(countries);
      })

      .catch(error => console.log(error));
  };

  value ? logCountries(value) : writeCountry(countryListEl, '');
};

searchBoxEl.addEventListener('input', debounce(searchText, DEBOUNCE_DELAY));

function writeCountry(container, value) {
  if (container === countryListEl) countryInfoEl.innerHTML = '';
  container.innerHTML = value;
}

const clearFirstCharacter = str => str.slice(1);

function createCountryList(countries) {
  const containerClass = clearFirstCharacter(countryList);

  const list = countries.reduce(
    (arr, { name, flags }) =>
      `${arr}
      <li class='${containerClass}__item'>
          <img class='${containerClass}__img' src="${flags.svg}" alt="${flags.alt}" width=80px height=50px>
          <h2 class='${containerClass}__name'>${name.official}<h2>
      </li>
  `,
    ''
  );

  writeCountry(countryListEl, list);
}

function createCountryCard(countries) {
  const containerClass = clearFirstCharacter(countryInfo);
  const languagesList = languages => Object.values(languages).join(', ');

  const list = countries
    .map(
      ({ capital, population, languages }) =>
        `<ul class='${containerClass}__list'>
          <li class='${containerClass}__item'>
          <span class='${containerClass}__text'>Capital:</span> ${capital}
          </li>
          <li class='${containerClass}__item'>
          <span class='${containerClass}__text'>Population:</span> ${population}
          </li>
          <li class='${containerClass}__item'>
          <span class='${containerClass}__text'>Languages:</span> ${languagesList(
          languages
        )}
          </li>
        </ul>`
    )
    .join('');

  writeCountry(countryInfoEl, list);
}
