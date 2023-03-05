import { Notify } from 'notiflix/build/notiflix-notify-aio';

export function fetchCountries(name) {
  const BASE_URL = 'https://restcountries.com/v3.1/name/';
  const SEARTH_FILTER = 'name,capital,population,flags,languages';

  return fetch(`${BASE_URL}${name}?fields=${SEARTH_FILTER}`)
    .then(response => {
      if (!response.ok) throw new Error(response.status);
      return response.json();
    })

    .catch(error => {
      Notify.failure(`Oops, there is no country with that name "${name}".`);
      return [];
    });
}
