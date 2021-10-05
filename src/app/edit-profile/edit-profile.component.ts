import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  @Input() newUser = { Username: '', Password: '', Email: '', Birthday: '' };

  username = JSON.parse(localStorage.getItem('user')!).username;

constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<EditProfileComponent>,
    public snackBar: MatSnackBar) { }

ngOnInit(): void {
}

// function responsible for sending form inputs to backend
  updateUser(): void {
		this.fetchApiData.updateUser(this.username, this.newUser).subscribe(response => {
			localStorage.setItem('username', JSON.stringify(response));
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
			window.location.reload();
		}, 1000)
	}

}