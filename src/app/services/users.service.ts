import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http:HttpClient) { }

  getAllUsers():any{
    return this.http.get("http://localhost:8080/users");
  }

  updateUser(user:any){
    return this.http.post("http://localhost:8080/updateUser",user);
  }
}
