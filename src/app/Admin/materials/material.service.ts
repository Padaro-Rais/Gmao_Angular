import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {
  constructor(private httpClient: HttpClient) { }

  getData(){
    const config = { headers: {Authorization: "Bearer "+localStorage.getItem('token')} };
    return this.httpClient.get(`${baseUrl}/materials`,config);
  }

  createMaterial(data:any){
    const config = { headers: {Authorization: "Bearer "+localStorage.getItem('token')} };
    return this.httpClient.post(`${baseUrl}/materials`,data,config);
  }

  deleteData(id:any){
    const config = { headers: {Authorization: "Bearer "+localStorage.getItem('token')} };
    return this.httpClient.delete(`${baseUrl}/materials/`+id ,config);
  }
}
