import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Path } from './path';

@Injectable({
  providedIn: 'root'
})
export class MerchantService {
  customers:Observable<any>;
  constructor(private http:HttpClient,private router:Router, private authService: AuthService) { }

  addMerchant(addMerchantForm){
    this.http.post(`${Path.currentPath}/merchant/add`,addMerchantForm).subscribe(res=>{
      alert(res["msg"]);
    })
  }

  getMerchants(){
    return this.http.get(`${Path.currentPath}/merchant`);
  }

  editMerchant(id){
    return this.http.get(`${Path.currentPath}/merchant/`+id)
  }

  updateMerchant(id,editMerchantform){
    this.http.put(`${Path.currentPath}/merchant/`+id,editMerchantform).subscribe(res=>{
      alert(res["msg"]);      
      this.router.navigate(['merchant/view']);
    })
  }

  deleteMerchant(id){
    this.http.delete(`${Path.currentPath}/merchant/`+id).subscribe(res=>{
      alert(res["msg"]);            
      this.router.navigate(['merchant/view']);
    })  
  }

  getCustomers(id){
    return this.http.get(`${Path.currentPath}/merchant/`+id+"/customers");
  }

  getAllcustomers(){
    return this.http.get(`${Path.currentPath}/customers?email=${this.authService.user.value.email}`)
  }
}
