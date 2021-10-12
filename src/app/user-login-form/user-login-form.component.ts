import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// This import brings in the API calls we created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {

	@Input() userData = { Username: '', Password: '' }

	constructor(
		public fetchApiData: FetchApiDataService,
		public dialogRef: MatDialogRef<UserLoginFormComponent>,
		public snackBar: MatSnackBar,
    public router: Router) { }

	ngOnInit(): void {
	}

	// Send the login form inputs to the backend
	 loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((result) => {
      this.dialogRef.close();
      this.router.navigate(['movies']);
      // Save token and user in local storage
      localStorage.setItem('token', result.token);
			localStorage.setItem('user', JSON.stringify(result.user));
      localStorage.setItem('username', result.user.Username);
      this.snackBar.open('login successful!', 'OK', {
        duration: 2000
      });
    }, (result) => {
      this.snackBar.open('login unsuccessful', 'OK', {
        duration: 2000
      });
      
    })
  }
}