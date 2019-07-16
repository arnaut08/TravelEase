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
    
    this.http.post("http://localhost:3000/bus/add",addBusform).subscribe(response=>{
      console.log(response);
    })
  }

  getBuses(){
    return this.http.get("http://localhost:3000/bus");
  }

  editBus(id){
    return this.http.get("http://localhost:3000/bus/"+id);
  }

  updateBus(id,editBusform){
    this.http.put("http://localhost:3000/bus/"+id,editBusform).subscribe(response=>{
      console.log(response);
      this.router.navigate(['bus/view']);
    })
  }

  deleteBus(id){
    this.http.delete("http://localhost:3000/bus/"+id).subscribe(response=>{
      console.log(response);
      this.router.navigate(['']);
    })  
  }
}
