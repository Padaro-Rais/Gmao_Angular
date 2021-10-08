import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {
  constructor(private httpClient: HttpClient) { }

  getData(){
    const config = { headers: {Authorization: "Bearer "+localStorage.getItem('token')} };
    return this.httpClient.get(`${baseUrl}/materialSuppliers`,config);
  }

  createProvider(data:any){
    const config = { headers: {Authorization: "Bearer "+localStorage.getItem('token')} };
    return this.httpClient.post(`${baseUrl}/materialSuppliers`,data,config);
  }

  deleteData(id:any){
    const config = { headers: {Authorization: "Bearer "+localStorage.getItem('token')} };
    return this.httpClient.delete(`${baseUrl}/materialSuppliers/`+id ,config);

  }

  updateData(id:any, data:any){
    const config = { headers: {Authorization: "Bearer "+localStorage.getItem('token')} };
    return this.httpClient.put(`${baseUrl}/materialSuppliers/`+id,data,config);
  }
}
