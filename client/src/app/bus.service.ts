import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Path } from './path';

@Injectable({
  providedIn: 'root'
})
export class BusService {

  constructor(private http: HttpClient, private router:Router) { }

  addBus(addBusform){    
    this.http.post(`${Path.currentPath}/bus/add`,addBusform).subscribe(res=>{
      alert(res['msg']);
      this.router.navigate(['bus/view'],{ queryParams: { page : 1 } });
    })
  }

  getBusesCount(searchVal){
    const url = `${Path.currentPath}/bus?search=${searchVal}`
    return this.http.get(url);
  }

  editBus(id){
    return this.http.get(`${Path.currentPath}/bus/`+id);
  }

  updateBus(id,editBusform){
    this.http.put(`${Path.currentPath}/bus/`+id,editBusform).subscribe(res=>{
      alert(res['msg']);
      this.router.navigate(['bus/view'],{ queryParams: { page : 1 } });
    })
  }

  deleteBus(id){
    this.http.delete(`${Path.currentPath}/bus/`+id).subscribe(res=>{
      alert(res['msg']);
      this.router.navigate(['']);
    })  
  }
  
  getbuses(page,searchVal){
    const url = `${Path.currentPath}/bus/view/${page}?search=${searchVal}`
    return  this.http.get(url)
  }
}
