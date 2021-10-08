import { Injectable } from '@angular/core';
import { baseUrl } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class CategorieService {
  constructor(private httpClient: HttpClient) { }

  getData(){
    const config = { headers: {Authorization: "Bearer "+localStorage.getItem('token')} };
    return this.httpClient.get(`${baseUrl}/materialCategories`,config);
  }

  createGroupe(data:any){
    const config = { headers: {Authorization: "Bearer "+localStorage.getItem('token')} };
    return this.httpClient.post(`${baseUrl}/materialCategories`,data,config);
  }

  deleteData(id:any){
    const config = { headers: {Authorization: "Bearer "+localStorage.getItem('token')} };
    return this.httpClient.delete(`${baseUrl}/materialCategories/`+id ,config);
  }

  updateData(id:any, data:any){
    const config = { headers: {Authorization: "Bearer "+localStorage.getItem('token')} };
    return this.httpClient.put(`${baseUrl}/materialCategories/`+id,data,config);
  }
}
