import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AddEditUserComponent } from '../add-edit-user/add-edit-user.component';
import { UserService } from 'src/app/services/user.service';
import { MatPaginator } from '@angular/material/paginator';

export interface UserData {
  id: string;
  name: string;
  LastName: string;
  email: string;
  roles: String;
  Action: any;
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  displayedColumns: string[] = ['Id', 'Name', 'Email', 'Role', 'Action'];
  totalRecords = 0;
  pageSize = 10;
  pageIndex = 0;
  //used any here because mat table can be configured but i want to make sure task gets completed
  userDetails!: MatTableDataSource<any>;
  constructor(public dialog: MatDialog, public userService: UserService) {}

  ngOnInit(): void {
    this.userDetails.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.userDetails.filter = filterValue.trim().toLowerCase();
  }

  private getUsers() {
    this.userDetails = new MatTableDataSource<any>(this.userService.getUser());
  }

  public openPopup() {
    const dialogRef = this.dialog.open(AddEditUserComponent, {
      width: '350px',
      data: {},
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getUsers();
    });
  }

  public editUser(index: any, data: any) {
    data.id = index;
    data.action = 'edit';
    const dialogRef = this.dialog.open(AddEditUserComponent, {
      width: '350px',
      data: data,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getUsers();
    });
  }

  public deleteUser(index: any) {
    const data = {
      action: 'delete',
    };
    const dialogRef = this.dialog.open(AddEditUserComponent, {
      width: '400px',
      data: data,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.userService.deleteUser(index);
        this.getUsers();
      }
    });
  }

  onPaginateChange(event: any) {
    console.log(event.pageIndex);
  }
}
