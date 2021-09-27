import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://borchers-movie-api.herokuapp.com/';
// Get token from local storage
const token = localStorage.getItem('token');
// Get Username from local storage
const username = localStorage.getItem('user')
@Injectable({
  providedIn: 'root'
})


// USER REGISTRATION
export class FetchApiDataService {
 // Inject the HttpClient module to the constructor params.
  	// This will provide HttpClient to the entire class, making it available via this.http .
  	constructor(private http: HttpClient) { }

  	// Api call for creating new user
  	public userRegistration(userDetails: any): Observable<any> {
		console.log(userDetails);
		return this.http.post(apiUrl + 'users', userDetails).pipe(
	  		catchError(this.handleError)
		);
  	}


	// Api call for the user login endpoint
	public userLogin(userDetails: any): Observable<any> {
		console.log(userDetails);
		return this.http.post(
			apiUrl + 'users',
			userDetails
		)
		.pipe(
			catchError(this.handleError)
		);
	}


// Api call to fetch all movies
	public getMovies(): Observable<any> {
		const token = localStorage.getItem('token');
		return this.http.get(
			apiUrl + 'movies',
			{headers: new HttpHeaders(
				{
					Authorization: `Bearer ${token}`,
				}
			)}
		).pipe(
			map(this.extractResponseData),
			catchError(this.handleError)
		);
	}

	// Api call to fetch one movie by its title
	public getSingleMovie(title: string): Observable<any> {
		const token = localStorage.getItem('token');
		return this.http.get(
			apiUrl + `movies/${title}`,
			{headers: new HttpHeaders(
				{
					Authorization: `Bearer ${token}`,
				}
			)}
		).pipe(
			map(this.extractResponseData),
			catchError(this.handleError)
		);
	}

	// Api call to fetch data about a director.
	public getDirector(director_name: string): Observable<any> {
		const token = localStorage.getItem('token');
		return this.http.get(
			apiUrl + `movies/details/directors/${director_name}`,
			{headers: new HttpHeaders(
				{
					Authorization: `Bearer ${token}`,
				}
			)}
		).pipe(
			map(this.extractResponseData),
			catchError(this.handleError)
		);
	}

	// Api call to fetch data about a genre.
	public getGenre(genre: string): Observable<any> {
		const token = localStorage.getItem('token');
		return this.http.get(
			apiUrl + `movies/genres/${genre}`,
			{headers: new HttpHeaders(
				{
					Authorization: `Bearer ${token}`,
				}
			)}
		).pipe(
			map(this.extractResponseData),
			catchError(this.handleError)
		);
	}

	// Api call to add a movie to favorite list
	public addMovieToFav(username: string, movieId: string): Observable<any> {
		const token = localStorage.getItem('token');
		return this.http.post(
			apiUrl + `users/${username}/favorites/${movieId}`,
			{/*No req body required */},
			{headers: new HttpHeaders(
				{
					Authorization: `Bearer ${token}`,
				}
			)}
		).pipe(
			map(this.extractResponseData),
			catchError(this.handleError)
		);
	}

	// Api call to remove a movie from favorite list
	public removeMovieFromFav(username: string, movieId: string): Observable<any> {
		const token = localStorage.getItem('token');
		return this.http.delete(
			apiUrl + `users/${username}/favorites/${movieId}`,
			{headers: new HttpHeaders(
				{
					Authorization: `Bearer ${token}`,
				}
			)}
		).pipe(
			map(this.extractResponseData),
			catchError(this.handleError)
		);
	}

	// Api call to update user's info
	public updateUser(username: string, newUser: any): Observable<any> {
		const token = localStorage.getItem('token');
		return this.http.put(
			apiUrl + `users/${username}`,
			newUser,
			{headers: new HttpHeaders(
				{
					Authorization: `Bearer ${token}`,
				}
			)}
		).pipe(
			map(this.extractResponseData),
			catchError(this.handleError)
		);
	}

	// Api call to delete a user
	public deleteUser(username: string): Observable<any> {
		const token = localStorage.getItem('token');
		return this.http.delete(
			apiUrl + `users/${username}`,
			{headers: new HttpHeaders(
				{
					Authorization: `Bearer ${token}`,
				}
			)}
		).pipe(
			catchError(this.handleError)
		);
	}


	// Private method
	private extractResponseData(res: Response | {} ): any {
		const body = res;
		return body || {};
	}


	// Private Method for error handling 
  	private handleError(error: HttpErrorResponse): any {
		if (error.error instanceof ErrorEvent) {
	  		console.error('Some error occurred:', error.error.message)
		} else {
			console.error(`Error Status code ${error.status},` + `Error body is: ${error.error}`);
			return throwError('Please try again later.')
		}
  	}
}