// src/app/user-registration-form/user-registration-form.component.ts
import { Component, OnInit, Input } from '@angular/core';

// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// This import brings in the API calls we created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})

/**
* This class represents the registration form
*/
export class UserRegistrationFormComponent implements OnInit {
  
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };
  
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar) { }
    
    ngOnInit(): void {
    }
    
    /**
    * Method responsible for sending registration form inputs to backend
    */
    registerUser(): void {
      this.fetchApiData.userRegistration(this.userData).subscribe((result) => {
        // Logic for successful user registration needs to be implemented here!
        this.dialogRef.close(); // will close the modal on success
        this.snackBar.open('You are ready to login!', 'OK', {
          duration: 2000
        });
      }, (result) => {
        this.snackBar.open('Something is not right. Please try again', 'OK', {
          duration: 2000
        });
      });
    }
  }