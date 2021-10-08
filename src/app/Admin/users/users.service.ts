import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from 'src/environments/environment';
import { Users } from 'src/app/Models/users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient: HttpClient) {}
    getUser(){
      const config = { headers: {Authorization: "Bearer "+localStorage.getItem('token')} };
      return this.httpClient.get(`${baseUrl}/users`,config);
    }

    getUserById(id:any){
      const config = { headers: {Authorization: "Bearer "+localStorage.getItem('token')} };
      return this.httpClient.get(`${baseUrl}/users/`+id ,config);
    }

    getRole(){
      const config = { headers: {Authorization: "Bearer "+localStorage.getItem('token')} };
      return this.httpClient.get(`${baseUrl}/roles`,config);
    }

    createUser(data:any){
      const config = { headers: {Authorization: "Bearer "+localStorage.getItem('token')} };
      return this.httpClient.post(`${baseUrl}/users`,data,config);
    }

    deleteData(id:any){
      const config = { headers: {Authorization: "Bearer "+localStorage.getItem('token')} };
      return this.httpClient.delete(`${baseUrl}/users/`+id ,config);
    }


    updateData(id:any, data:any){
      const config = { headers: {Authorization: "Bearer "+localStorage.getItem('token')} };
      return this.httpClient.put(`${baseUrl}/users/`+id,data,config);
    }

}
