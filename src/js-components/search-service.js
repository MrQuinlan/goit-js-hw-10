const BASE_URL = 'https://restcountries.com/v3.1';
const url = `${BASE_URL}/name`;

export default class Countries {
  constructor(countryName) {
    this.countryName = countryName;
  }

  url = `${url}/${this.countryName}?fields=name,capital,population,flags,languages`;

  getCounrty() {
    return fetch(`${url}/${this.countryName}?fields=name,capital,population,flags,languages`).then(
      response => {
        if (response.status === 404) {
          throw new Error();
        }

        return response.json();
      },
    );
  }
}
