import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BusService {

  constructor(private http: HttpClient, private router:Router) { }

  addBus(addBusform){
    console.log(addBusform);
    
    this.http.post("http://localhost:3000/bus/add",addBusform).subscribe(res=>{
      alert(res['msg']);
    })
  }

  getBuses(){
    return this.http.get("http://localhost:3000/bus");
  }

  editBus(id){
    return this.http.get("http://localhost:3000/bus/"+id);
  }

  updateBus(id,editBusform){
    this.http.put("http://localhost:3000/bus/"+id,editBusform).subscribe(res=>{
      alert(res['msg']);
      this.router.navigate(['bus/view']);
    })
  }

  deleteBus(id){
    this.http.delete("http://localhost:3000/bus/"+id).subscribe(res=>{
      alert(res['msg']);
      this.router.navigate(['']);
    })  
  }
}
