import { Injectable } from '@angular/core';
import { baseUrl } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  constructor(private httpClient: HttpClient) { }

  getData(){
    const config = { headers: {Authorization: "Bearer "+localStorage.getItem('token')} };
    return this.httpClient.get(`${baseUrl}/locations`,config);
  }

  getUserById(id:any){
    const config = { headers: {Authorization: "Bearer "+localStorage.getItem('token')} };
    return this.httpClient.get(`${baseUrl}/locations/`+id ,config);
  }

  createLocation(data:any){
    const config = { headers: {Authorization: "Bearer "+localStorage.getItem('token')} };
    return this.httpClient.post(`${baseUrl}/locations`,data,config);
  }

  deleteData(id:any){
    const config = { headers: {Authorization: "Bearer "+localStorage.getItem('token')} };
    return this.httpClient.delete(`${baseUrl}/locations/`+id ,config);
  }

  updateData(id:any, data:any){
    const config = { headers: {Authorization: "Bearer "+localStorage.getItem('token')} };
    return this.httpClient.put(`${baseUrl}/locations/`+id,data,config);
  }


  Createlocals(data:any){
    const config = { headers: {Authorization: "Bearer "+localStorage.getItem('token')} };
    return this.httpClient.post(`${baseUrl}/locals`,data,config);
  }

  getlocal(){
    const config = { headers: {Authorization: "Bearer "+localStorage.getItem('token')} };
    return this.httpClient.get(`${baseUrl}/locals`,config);
  }

  updatelocal(id:any, data:any){
    const config = { headers: {Authorization: "Bearer "+localStorage.getItem('token')} };
    return this.httpClient.put(`${baseUrl}/locals/`+id,data,config);
  }





  CreateAgencies(data:any){
    const config = { headers: {Authorization: "Bearer "+localStorage.getItem('token')} };
    return this.httpClient.post(`${baseUrl}/agencies`,data,config);
  }

  getAgencies(){
    const config = { headers: {Authorization: "Bearer "+localStorage.getItem('token')} };
    return this.httpClient.get(`${baseUrl}/agencies`,config);
  }

  updateAgencie(id:any, data:any){
    const config = { headers: {Authorization: "Bearer "+localStorage.getItem('token')} };
    return this.httpClient.put(`${baseUrl}/agencies/`+id,data,config);
  }




}
