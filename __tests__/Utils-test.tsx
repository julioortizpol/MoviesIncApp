/**
 * @format
 */

// Note: test renderer must be required after react-native.
import { formatDate, sortMoviesByTitle } from '../utils';
import { Movies } from '../types/Movie';


describe('formatDate', () => {
  it('given a date string, formatDate() return formated Date', () => {
    expect(formatDate('2023-03-22')).toBe('22 mar, 2023');
  });
})

it('given a list of Movies, sortMoviesByTitle() return ordered list base on title', () => {
  const movies: Movies = [
    {

      "id": 502356,
      "posterPath": "/zNKs1T0VZuJiVuhuL5GSCNkGdxf.jpg",
      "releaseDate": "2023-04-05",
      "title": "Súper Mario Bros. La película",
      "voteAverage": 7.5,
  },
  {

      "id": 758323,
      "posterPath": "/qcknZEeD71byJ3XSalDDZ5iHpNr.jpg",
      "releaseDate": "2023-04-05",
      "title": "El exorcista del papa",
      "voteAverage": 7.4,
  },
  ]
  expect(sortMoviesByTitle(movies)).toEqual(
    [
      {
  
        "id": 758323,
        "posterPath": "/qcknZEeD71byJ3XSalDDZ5iHpNr.jpg",
        "releaseDate": "2023-04-05",
        "title": "El exorcista del papa",
        "voteAverage": 7.4,
    },
      {
  
        "id": 502356,
        "posterPath": "/zNKs1T0VZuJiVuhuL5GSCNkGdxf.jpg",
        "releaseDate": "2023-04-05",
        "title": "Súper Mario Bros. La película",
        "voteAverage": 7.5,
    },
    ]
  );
});
