import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng';
import { UserModel } from 'src/app/shared/models/user.model';
import { DataService } from 'src/app/shared/services/data.service';
import { RegisterComponent } from '../register/register.component';
import { UserDetailsComponent } from '../user-details/user-details.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  providers: [DialogService]
})
export class UserListComponent implements OnInit {

  registerUserRef: any;
  userDetailsRef: any;
  users: UserModel[] = [];
  cols: any;
  searchText = '';
  selectedUser: any = null;

  constructor(
    private dialogService: DialogService,
    private dataService: DataService) { }

  ngOnInit(): void {
    this.cols = [
      { field: 'address', header: 'Address' },
      { field: 'name', header: 'Name' },
      { field: 'role', header: 'Role' }
    ];

    this.getAllUsers();
  }

  getAllUsers() {
    this.dataService.getAllUsers().subscribe(data => {
      this.users = data.users;
    });
  }

  registerUser() {
    this.registerUserRef = this.dialogService.open(RegisterComponent, {
      header: 'Register User',
      width: '680px'
    });

    this.registerUserRef.onClose.subscribe((value: boolean) => {
      if (value) {
        this.getAllUsers();
      }
    });
  }

  onUserSelect(user: UserModel) {
    this.userDetailsRef = this.dialogService.open(UserDetailsComponent, {
      header: 'User Details',
      width: '680px',
      data: { user }
    });

    this.userDetailsRef.onClose.subscribe(() => {
      this.selectedUser = null;
    });
  }

}
