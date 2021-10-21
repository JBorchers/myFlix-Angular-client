import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
	selector: 'app-edit-profile',
	templateUrl: './edit-profile.component.html',
	styleUrls: ['./edit-profile.component.scss',]
})


/**
* This class represents a form that a user can use to updata user data. It is a child component of user-profile
*/
export class EditProfileComponent implements OnInit {
	
	@Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };
	
	username = JSON.parse(localStorage.getItem('user')!).Username;
	
	constructor(
		public fetchApiData: FetchApiDataService,
		public dialogRef: MatDialogRef<EditProfileComponent>,
		public snackBar: MatSnackBar,
		public router: Router) { }
		
		ngOnInit(): void {
		}
		
		
		/**
		 * Method that sends inputs from the form to the database
		 * Updatd database information is represented on the profile component
		 */
		updateUser(): void {
			this.fetchApiData.updateUser(this.username, this.userData).subscribe(response => {
				console.log(response);
				// localStorage.setItem('username', JSON.stringify(response.Username));
				localStorage.setItem('user', JSON.stringify(response));
				this.snackBar.open('Your credentials have been updated', 'OK', {
					duration: 2000,
				})
			}, (response) => {
				console.log(response);
				this.snackBar.open('Try again', 'OK', {
					duration: 2000,
				})
			})
			setTimeout(() => {
				this.router.navigate(['/welcome']);
			}, 2000)
			this.dialogRef.close();
		}
		
	}