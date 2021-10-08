import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContractService {
  constructor(private httpClient: HttpClient) { }

  getData(){
    const config = { headers: {Authorization: "Bearer "+localStorage.getItem('token')} };
    return this.httpClient.get(`${baseUrl}/contracts`,config);
  }

  getUserById(id:any){
    const config = { headers: {Authorization: "Bearer "+localStorage.getItem('token')} };
    return this.httpClient.get(`${baseUrl}/contracts/`+id ,config);
  }

  createContract(data:any){
    const config = { headers: {Authorization: "Bearer "+localStorage.getItem('token')} };
    return this.httpClient.post(`${baseUrl}/contracts`,data,config);
  }

  deleteData(id:any){
    const config = { headers: {Authorization: "Bearer "+localStorage.getItem('token')} };
    return this.httpClient.delete(`${baseUrl}/contracts/`+id ,config);
  }

  updateData(id:any, data:any){
    const config = { headers: {Authorization: "Bearer "+localStorage.getItem('token')} };
    return this.httpClient.put(`${baseUrl}/contracts/`+id,data,config);
  }
}
