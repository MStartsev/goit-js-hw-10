// export async function fetchCountries(name) {
//   const response = await fetch(
//     `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
//   );
//   const countries = await response.json();
//   return countries;
// }
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export function fetchCountries(name) {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
  )
    .then(response => {
      if (!response.ok) throw new Error('Unable to fetch data');
      return response.json();
    })
    .catch(error => {
      Notify.failure('Oops, there is no country with that name');
      return [];
    });
}
