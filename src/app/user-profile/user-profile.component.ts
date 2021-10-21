import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  
  // @Input() userData = {Username: '', Password: '', Email: '', Birthday: ''};
  
  // user = JSON.parse(localStorage.getItem('user')!);
  user: any = {};
  
  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public router: Router,
    ) { }
    
    ngOnInit(): void {
      this.getUser();
    }
    
    
    /**
    * Method that retrieves user's info from API
    */
    getUser(): void {
      let user = localStorage.getItem('username');
      this.fetchApiData.getUser(user).subscribe((res: any) => {
        this.user = res;
      });
    }
    
    
    /**
    * Method that opens EditProfileComponent
    */
    openUserUpdateDialog(): void {
      this.dialog.open(EditProfileComponent, {
        width: '400px'
      });
    }
    
    
    /**
    * Method to delete a user's profile
    * This method clears the user's info from the database and routes back to Welcome screen
    */
    deleteProfile(): void {
      if(confirm('Are you sure you want to delete your account?')) {
        this.fetchApiData.deleteUser().subscribe(() => {
          localStorage.clear();
          // this.router.navigate(['welcome']);
          this.snackBar.open('Account Deleted', 'OK', {
            duration: 3000
          });
        })
        setTimeout(() => {
          this.router.navigate(['/welcome']);
        }, 2000)
      }
    }
    
  }
  
  