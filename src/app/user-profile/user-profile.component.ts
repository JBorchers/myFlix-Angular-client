import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  @Input() userData = {Username: '', Password: '', Email: '', Birthday: ''};

  user = JSON.parse(localStorage.getItem('user')!);

  constructor(
  public fetchApiData: FetchApiDataService,
  public snackBar: MatSnackBar,
  public dialog: MatDialog,
  public router: Router,
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    // let user = localStorage.getItem('UserName');
    // this.fetchApiData.getUser().subscribe((res: any) => {
    //   this.user = res;
    // });
  }
  
  openUserUpdateDialog(): void {
    this.dialog.open(EditProfileComponent, {
      width: '400px'
    });
  }
}

