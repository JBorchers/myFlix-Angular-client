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

// Decorator that makes the "FetchApiDataService" service available anywhere in the app.
@Injectable({
  providedIn: 'root'
})


// USER REGISTRATION
export class FetchApiDataService {
 // Inject the HttpClient module to the constructor params.
  	// This will provide HttpClient to the entire class, making it available via this.http .
  	constructor(private http: HttpClient, private router: Router) { }

  	// Api call for creating new user
  	public userRegistration(userData: any): Observable<any> {
		console.log(userData);
		return this.http.post(
			apiUrl + 'users', userData)
			.pipe(
	  		catchError(this.handleError)
			);
  	}


	// Api call for the user login endpoint
	public userLogin(userData: any): Observable<any> {
		console.log(userData);
		return this.http.post(
			apiUrl + 'login', userData
		)
		.pipe(
			catchError(this.handleError)
		);
	}


// Api call to fetch all movies
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

  // Api call to fetch the user's details
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

	//  getFavoriteMovies(): Observable<any> {
  //   const token = localStorage.getItem('token');
  //   const username = localStorage.getItem('username');
  //   return this.http.get(apiUrl + `users/${username}/movies`, {
  //     headers: new HttpHeaders(
  //       {
  //         Authorization: 'Bearer ' + token,
  //       })
  //   }).pipe(
  //     map(this.extractResponseData),
  //     catchError(this.handleError)
  //   );
  // }

  
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

	// Api call to add a movie to favorite list
	public addMovieToFav(username: string, movieId: string): Observable<any> {
		const token = localStorage.getItem('token');
		return this.http.post(
			apiUrl + `users/${username}/movies/${movieId}`,
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
			apiUrl + `users/${username}/movies/${movieId}`,
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

// public deleteUser(): Observable<any> {
// 		const token = localStorage.getItem('token');
// 		const user = localStorage.getItem('username');
// 		return this.http.delete(
// 			apiUrl + `users/${user}`,
// 			{headers: new HttpHeaders(
// 				{
// 					Authorization: `Bearer ${token}`,
// 				}
// 			)}
// 		).pipe(
// 			map(this.extractResponseData),
// 			catchError(this.handleError)
// 		);
// 	}

	// Api call to delete a user
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


	// Private Method for error handling 
  	private handleError(error: HttpErrorResponse): any {
		if (error.error instanceof ErrorEvent) {
	  		console.error('Some error occurred:', error.error.message)
		} else {
			console.error(`Error Status code ${error.status},` + `Error body is: ${error.error.message}`);
			return throwError('Please try again later.')
		}
  	}
    
}