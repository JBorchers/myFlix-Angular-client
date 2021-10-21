import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-synopsis',
  templateUrl: './movie-synopsis.component.html',
  styleUrls: ['./movie-synopsis.component.scss']
})

/**
 * This class renders data about movie's description
 */
export class MovieSynopsisComponent implements OnInit {

 constructor( @Inject(MAT_DIALOG_DATA) public data: any ) { }

  ngOnInit(): void {
  }

}
