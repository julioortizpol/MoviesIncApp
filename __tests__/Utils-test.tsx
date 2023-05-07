/**
 * @format
 */

// Note: test renderer must be required after react-native.
import { formatDate, sortMoviesByTitle } from '../utils';
import { Movies } from '../Models/Movie';


describe('formatDate', () => {
  it('given a date string, formatDate() return formated Date', () => {
    expect(formatDate('2023-03-22')).toBe('22 mar, 2023');
    expect(formatDate('2023/03/22')).toBe('22 mar, 2023');
  });
})

it('given a list of Movies, sortMoviesByTitle() return ordered list base on title', () => {
  const movies: Movies = [
    {

      "id": 502356,
      "poster_path": "/zNKs1T0VZuJiVuhuL5GSCNkGdxf.jpg",
      "release_date": "2023-04-05",
      "title": "Súper Mario Bros. La película",
      "vote_average": 7.5,
  },
  {

      "id": 758323,
      "poster_path": "/qcknZEeD71byJ3XSalDDZ5iHpNr.jpg",
      "release_date": "2023-04-05",
      "title": "El exorcista del papa",
      "vote_average": 7.4,
  },
  ]
  expect(sortMoviesByTitle(movies)).toEqual(
    [
      {
  
        "id": 758323,
        "poster_path": "/qcknZEeD71byJ3XSalDDZ5iHpNr.jpg",
        "release_date": "2023-04-05",
        "title": "El exorcista del papa",
        "vote_average": 7.4,
    },
      {
  
        "id": 502356,
        "poster_path": "/zNKs1T0VZuJiVuhuL5GSCNkGdxf.jpg",
        "release_date": "2023-04-05",
        "title": "Súper Mario Bros. La película",
        "vote_average": 7.5,
    },
    ]
  );
});
