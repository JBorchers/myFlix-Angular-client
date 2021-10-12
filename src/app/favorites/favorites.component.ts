import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { MovieGenreComponent } from '../movie-genre/movie-genre.component'
import { MovieDirectorComponent } from '../movie-director/movie-director.component';
import { MovieSynopsisComponent } from '../movie-synopsis/movie-synopsis.component';
import { Router } from '@angular/router';

const user = localStorage.getItem('username');

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  isLoading = false;
  user: any = {};
  FavoriteMovies: any = [];
  movies: any[] = [];
  faves: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.getMovies();
    this.getUsersFavs();
  }


  getMovies(): void {
  this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.filterFavorites;
    });
  }


  // get user's favorite movies
  getUsersFavs(): void {
    const user = localStorage.getItem('username');
    this.fetchApiData.getUserProfile(user).subscribe((resp: any) => {
      this.faves = resp.FavoriteMovies;
      // displayes favorite movies in console
      console.log(this.faves);
      return this.faves;
    });
  }

  // getUserProfile(): void {
  //   let user = localStorage.getItem('username');
  //   this.fetchApiData.getUserProfile(user).subscribe((res: any) => {
  //     this.user = res;
  //   });
  // }



  // Filters movies to display only the users favorites
  filterFavorites(): void {
    this.movies.forEach((movies: any) => {
      if (this.faves.includes(movies._id)) {
        this.faves.push(movies);
      } console.log(this.faves, 'faves')
    });
    return this.FavoriteMovies;
  }

openGenre(name: string, description: string): void {
    this.dialog.open(MovieGenreComponent, {
      data: {name, description},
      width: '650px'
    });
  }

  openDirectorDialog(name: string, bio: string, birthyear: string): void {
    this.dialog.open(MovieDirectorComponent, {
      data: {name, bio, birthyear},
      width: '650px'
    })
  }

  openMovieSynopsis(Title: string, description: string, imagePath: any): void {
    this.dialog.open(MovieSynopsisComponent, {
      data: { Title, description, ImagePath: imagePath },
      width: '650px'
    });
  }

  // adds the movie to the user's favorite movies array

  addFavoriteMovie(id: string, Title: string): void {
    this.fetchApiData.addFavoriteMovie(id).subscribe((res: any) => {
      this.snackBar.open(`${Title} has been added to favorties`, 'OK', {
        duration: 3000,
      })
      return this.getUsersFavs();
    })
  }

  removeFromFavorites(id: string, Title: string): void {
    this.fetchApiData.removeFavoriteMovie(id).subscribe((res: any) => {
      this.snackBar.open(`${Title} has been removed from favorties`, 'OK', {
        duration: 3000,
      })
      setTimeout(function () {
        window.location.reload();
      }, 3500);
      return this.getUsersFavs();
    })
  }

  setFaveStatus(id: any): any {
    if (this.faves.includes(id)) {
      return true;
    } else {
      return false;
    }
  }

}
