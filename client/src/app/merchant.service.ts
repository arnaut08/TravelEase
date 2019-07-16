import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MerchantService {
  
  constructor(private http:HttpClient,private router:Router) { }

  addMerchant(addMerchantForm){
    this.http.post("http://localhost:3000/merchant/add",addMerchantForm).subscribe(response=>{
      console.log(response);
    })
  }

  getMerchants(){
    return this.http.get("http://localhost:3000/merchant");
  }

  editMerchant(id){
    return this.http.get("http://localhost:3000/merchant/"+id)
  }

  updateMerchant(id,editMerchantform){
    this.http.put("http://localhost:3000/merchant/"+id,editMerchantform).subscribe(response=>{
      console.log(response);
      this.router.navigate(['merchant/view']);
    })
  }

  deleteMerchant(id){
    console.log(id)
    this.http.delete("http://localhost:3000/merchant/"+id).subscribe(response=>{
      console.log(response);
      this.router.navigate(['']);
    })  
  }
}
