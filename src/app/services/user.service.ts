import { Injectable } from '@angular/core';

interface UserType {
  name: string;
  email: string;
  role: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userDetails: UserType[] = [];
  constructor() {}

  //Used any for temporary purpose
  roles: any = [
    {
      id: '1',
      roleName: 'Admin',
    },
    {
      id: '2',
      roleName: 'Users',
    },
  ];

  public getUser() {
    return this.userDetails;
  }

  public addUser(data: UserType) {
    this.userDetails.push(data);
  }

  public editUser(index: number, data: UserType) {
    this.userDetails[index] = data;
  }

  public deleteUser(index: number) {
    this.userDetails.splice(index, 1);
  }

  public getRoles() {
    return this.roles;
  }
}
