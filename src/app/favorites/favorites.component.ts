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

/**
* This class represents the user's list of favorite movies
*/
export class FavoritesComponent implements OnInit {
  isLoading = false;
  user: any = JSON.parse(localStorage.getItem('user')!);
  faves: any[] = [];
  favMoviesId = this.user.FavoriteMovies;
  favMoviesIdLength: number = this.favMoviesId.length;
  
  
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public router: Router,
    ) { }
    
    ngOnInit(): void {
      // this.getMovies();
      this.getUsersFavs();
    }
    
    
    /**
    *  Method that makes an API call to fetch all movies
    *  The results are filtered based on "favMoviesId", a property of this class
    */
    getUsersFavs(): void {
      this.fetchApiData.getAllMovies().subscribe((response: any) => {
        this.faves = response.filter((m:any) => {
          return this.favMoviesId.indexOf(m._id) >= 0;
        });
      })
    }
    
    
    /**
    * Method to filter movies list based on a favorite's id
    * @returns user's favorite movies
    */
    filterFavorites(): void {
      this.faves.forEach((movies: any) => {
        if (this.faves.includes(movies._id)) {
          this.faves.push(movies);
        } console.log(this.faves, 'faves')
      });
      return this.user.FavoriteMovies;
    }
        
    
    /**
     * Method that opens genre dialog
     * @param name 
     * @param description 
     */
    openGenre(name: string, description: string): void {
      this.dialog.open(MovieGenreComponent, {
        data: {name, description},
        width: '650px'
      });
    }
    

    /**
     * Method that opens director dialog
     * @param name 
     * @param bio
     */
    openDirectorDialog(name: string, bio: string): void {
      this.dialog.open(MovieDirectorComponent, {
        data: {name, bio},
        width: '650px'
      })
    }
    

    /**
     * Method that opens movie synopsis
     * @param Title 
     * @param description 
     * @param imagePath 
     */
    openMovieSynopsis(Title: string, description: string, imagePath: any): void {
      this.dialog.open(MovieSynopsisComponent, {
        data: { Title, description, ImagePath: imagePath },
        width: '650px'
      });
    }
    
    
    /**
     * Method that removes a movie from favorites from within this component
     * @param id
     * @param Title 
     */
    removeFromFavorites(id: string, Title: string): void {
      this.fetchApiData.removeFavoriteMovie(id).subscribe(response => {
        localStorage.setItem('user', JSON.stringify(response));
        this.snackBar.open(`${Title} has been removed from favorties`, 'OK', {
          duration: 3000,
        })
        setTimeout(function () {
          // window.location.reload();
        }, 3500);
        this.getUsersFavs();
        return this.favMoviesId = JSON.parse(localStorage.getItem('user')!).FavoriteMovies;
      })
    }
    
  }