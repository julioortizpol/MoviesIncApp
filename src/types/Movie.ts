export type Movie = {
	id: number,
	title: string,
	releaseDate: string,
	voteAverage: number,
	posterPath: string
}

export type MovieResponse = {
	id: number;
	title: string;
	original_title: string;
	poster_path: string;
	adult: boolean;
	overview: string;
	release_date: string;
	genre_ids: number[];
	original_language: string;
	backdrop_path: string;
	popularity: number;
	vote_count: number;
	video: boolean;
	vote_average: number;
}
export type Movies = Movie[]