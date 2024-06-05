import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.css'],
})
export class AddEditUserComponent implements OnInit {
  addUserForm!: FormGroup;
  roles: any;
  selected: String = '';
  constructor(
    public dialogRef: MatDialogRef<AddEditUserComponent>,
    public userService: UserService,
    @Inject(MAT_DIALOG_DATA) public incomingData: any
  ) {}

  ngOnInit(): void {
    this.addUserForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.email),
      roles: new FormControl('', Validators.required),
    });
    this.addUserForm.patchValue(this.incomingData);
    this.getRoles();
  }

  public closePopup() {
    this.dialogRef.close();
    this.addUserForm.reset();
  }

  public addUser() {
    if (
      this.incomingData &&
      this.incomingData.action &&
      this.incomingData.action === 'edit'
    ) {
      this.userService.editUser(this.incomingData.id, this.addUserForm.value);
      this.dialogRef.close();
    } else if (this.addUserForm.invalid) {
      this.dialogRef.close();
    } else {
      this.userService.addUser(this.addUserForm.value);
      this.dialogRef.close();
    }
  }

  public deleteUser() {
    this.dialogRef.close(true);
  }

  public cancelDelete() {
    this.dialogRef.close(false);
  }

  private getRoles() {
    this.roles = this.userService.getRoles();
  }
}
