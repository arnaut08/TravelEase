import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Path } from './path';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  
  constructor(private http : HttpClient) { }

  getUserDetails(){
    return this.http.get(`${Path.currentPath}/profile`);
  }

  uploadPic(pic){
    return this.http.post(`${Path.currentPath}/upload`,pic);
  }
}
