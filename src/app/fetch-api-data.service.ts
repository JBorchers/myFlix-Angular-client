import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
// import  Config from 'src/config';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://borchers-movie-api.herokuapp.com/';
// Get token from local storage
const token = localStorage.getItem('token');
// Get Username from local storage
const username = localStorage.getItem('user');


/**
 * Decorator that makes the "FetchApiDataService" service available anywhere in the app
 */
@Injectable({
  providedIn: 'root'
})


/**
 * This service contains the methods to access all the endpoints of the movie API
 */
export class FetchApiDataService {
 /**
	* Inject the HttpClient module to the constructor params.
  * This will provide HttpClient to the entire class, making it available via this.http
	*/
  	constructor(private http: HttpClient, private router: Router) { }


  /**
	 * User Registration / Create new user
	 * @param userData
	 * @returns POST request to 'users'
	 */
  	public userRegistration(userData: any): Observable<any> {
		console.log(userData);
		return this.http.post(
			apiUrl + 'users', userData)
			.pipe(
	  		catchError(this.handleError)
			);
  	}


	/**
	 * User Login
	 * @param userData
	 * @returns POST request to 'login'
	 */
	public userLogin(userData: any): Observable<any> {
		console.log(userData);
		return this.http.post(
			apiUrl + 'login', userData
		)
		.pipe(
			catchError(this.handleError)
		);
	}


	/**
	 * Get all movies
	 * @returns GET request to 'movies'
	 */
	public getAllMovies(): Observable<any> {
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
	

	/**
	 * Get a single movie by its title
	 * @param title 
	 * @returns GET request to 'movies/:title
	 */
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


	/**
	 * Get data about a director
	 * @param director_name 
	 * @returns GET request to 'movies/:director_name'
	 */
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


	/**
	 * Get data about a genre
	 * @param genre 
	 * @returns GET request to 'movies/genres/:genre'
	 */
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


  /**
	 * Get data about a user
	 * @param username 
	 * @returns GET request to 'users/:user'
	 */
	public getUser(user: any): Observable<any> {
		const token = localStorage.getItem('token');
		return this.http.get(
			apiUrl + `users/${user}`,
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

  
	/**
	 * Add a movie to the list of favorite movies
	 * @param username 
	 * @param id 
	 * @returns POST request to 'users/:user/Movies/:id'
	 */
   public addFavoriteMovie(id: string): Observable<any> {
    const user = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    return this.http.post(apiUrl + `users/${user}/Movies/` + id, null, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }


	/**
	 * Remove a movie from the list of favorite movies
	 * @param user 
	 * @param id
	 * @returns DELETE request to 'users/:user/Movies/:id'
	 */
	removeFavoriteMovie(id: string): Observable<any> {
    const user = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + `users/${user}/Movies/` + id, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }


	/**
	 * Update user's info
	 * @param username 
	 * @param userData
	 * @returns PUT request to 'users/:username'
	 */
	public updateUser(username: string, userData: any): Observable<any> {
		const token = localStorage.getItem('token');
		// const username = localStorage.getItem('user.Username');
		console.log(userData);
		return this.http.put(
			apiUrl + `users/${username}`,
			userData,
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


	/**
	 * Get a user's profile
	 * @param username 
	 * @returns GET request to 'users/:username'
	 */
	getUserProfile(username: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'users/' + username, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      catchError(this.handleError)
    );
  }


	/**
	 * Delete an account
	 * @returns DELETE request to 'users/:username'
	 */
	public deleteUser(): Observable<any> {
    const user = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + 'users/' + user, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
    catchError(this.handleError)
    );
  }


	// Private method
	private extractResponseData(res: Response | {} ): any {
		const body = res;
		return body || {};
	}


	/**
	 * Error handler for each method that uses the HTTP module
	 * @param error
	 * @returns 
	 */
  	private handleError(error: HttpErrorResponse): any {
		if (error.error instanceof ErrorEvent) {
	  		console.error('Some error occurred:', error.error.message)
		} else {
			console.error(`Error Status code ${error.status},` + `Error body is: ${error.error.message}`);
			return throwError('Please try again later.')
		}
  }
    
}