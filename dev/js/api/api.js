import fetch from 'isomorphic-fetch';

// Here is the place where you call your API to get datas to send in the store
// Let's just increment our counter for the example

/* IMPORTANT
** It is possible that your fetch does not work if you have AdBlock plus extension installed. Just allow the page and retry.
*/

// Get all movies
export const getMovies = () => fetch('https://facebook.github.io/react-native/movies.json')
  .then(
    response => response.json(),
    error => console.log('An error occured : ', error),
  );


export default getMovies;
