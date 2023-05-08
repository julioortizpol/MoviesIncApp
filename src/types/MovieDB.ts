export type Movie = {
	id: number,
	title: string,
	releaseDate: string,
	voteAverage: number,
	posterPath: string,
	overview?: string;
	genres?: {id: number, name: string}[],
	actors?: Actor[]
}

export type MovieDBResponse = {
	id: number;
	title: string;
	original_title: string;
	poster_path: string;
	adult: boolean;
	overview: string;
	release_date: string;
	genre_ids: number[];
	genres?: {id: number, name: string}[],
	original_language: string;
	backdrop_path: string;
	popularity: number;
	vote_count: number;
	video: boolean;
	vote_average: number;
	credits?: {cast: [], crew: []}
}

export type Actor = {
	name: String,
	id: Number,
	character: String,
	profilePath: String
}

export type GuestSession = {
	guestSessionId: string,
	expireDate: string
}

export type Movies = Movie[]