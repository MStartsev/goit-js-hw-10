export async function fetchCountries(name) {
  const response = await fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
  );
  const countries = await response.json();
  return countries;
}

// function fetchCountries(name) {
//   return fetch(`https://restcountries.com/v3.1/name/${name}`)
//     .then(res => {
//       if (!res.ok) {
//         throw new Error('Error');
//       }

//       return res.json();
//     })
//     .catch(error => console.log(error));
// }
