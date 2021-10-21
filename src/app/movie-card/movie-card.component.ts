import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { MovieGenreComponent } from '../movie-genre/movie-genre.component';
import { MovieDirectorComponent } from '../movie-director/movie-director.component';
import { MovieSynopsisComponent } from '../movie-synopsis/movie-synopsis.component';


@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})


/**
 * This class represents the homepage of the app where all the movies are displayed
*/
export class MovieCardComponent {
  movies: any[] = [];
  // faves: any[] = [];
  user: any = JSON.parse(localStorage.getItem('user')!);
  faves: any[] = this.user.FavoriteMovies;
  
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    ) { }

ngOnInit(): void {
  this.getMovies();
  this.getUsersFavs();
}


/**
 *  Method that fetches all the movies form the API and assingns the response to the "movie" property of this class.
 * @returns all movies in database
 */
getMovies(): void {
  this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }


  /**
	 * Display genre details in a dialog
	 * @param name 
	 * @param description 
   * @returns genre info dialog
	 */
  openGenre(name: string, description: string): void {
    this.dialog.open(MovieGenreComponent, {
      data: {name, description},
      width: '650px'
    });
  }


  /**
	 * Display director details in a dialog
	 * @param name 
	 * @param bio 
	 * @param birth
   * @returns director info dialog
	 */
  openDirectorDialog(name: string, bio: string, birthyear: string): void {
    this.dialog.open(MovieDirectorComponent, {
      data: {name, bio, birthyear},
      width: '650px'
    })
  }


  /**
	 * Display movie synopsis in a dialog
	 * @param title 
   * @param description 
	 * @param imagePath 
   * @returns movie synopsis dialog
	 */
  openMovieSynopsis(Title: string, description: string, imagePath: any): void {
    this.dialog.open(MovieSynopsisComponent, {
      data: { Title, description, ImagePath: imagePath },
      width: '650px'
    });
  }


  /**
	 * Method that adds a favorite movie to the user's favorites list
	 * @param id
	 * @param Title 
	 */
  addFavoriteMovie(id: string, Title: string): void {
    this.fetchApiData.addFavoriteMovie(id).subscribe((res: any) => {
      // let favMovies = res.Favorites;
      this.snackBar.open(`${Title} has been added to favorties`, 'OK', {
        duration: 3000,
      })
      return this.getUsersFavs();
    })
  }


  /**
	 * Method that removes a favorite movie from the user's favorites list
	 * @param id
	 * @param Title 
	 */
  removeFromFavorites(id: string, Title: string): void {
   this.fetchApiData.removeFavoriteMovie(id).subscribe((res: any) => {
    //  let favMovies = res.Favorites;
     this.snackBar.open(`${Title} has been removed from favorties`, 'OK', {
       duration: 3000,
     })
     return this.getUsersFavs();
   })
  }


  /**
	 * Method that removes a favorite movie from the user's favorites list
	 * @returns list of favorite movies
	 */
  getUsersFavs(): void {
    const username = localStorage.getItem('username');
    this.fetchApiData.getUser(username).subscribe((resp: any) => {
      this.faves = resp.FavoriteMovies;
      console.log(this.faves);
      localStorage.setItem('user', JSON.stringify(resp));
      return this.faves;
    });
  }
  

  /**
	 * Method compares movie id's with getUsersFavs list
	 * @param id 
	 * @returns boolean
	 */
  setFaveStatus(id: any): any {
    if (this.faves.includes(id)) {
      return true;
    } else {
      return false;
    }
  }


}