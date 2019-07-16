import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MerchantService } from '../../merchant.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addmerchant',
  templateUrl: './addmerchant.component.html',
  styleUrls: ['./addmerchant.component.css']
})
export class AddmerchantComponent implements OnInit {
  addMerchantform : FormGroup;
  password:string;
  constructor(private merchantService: MerchantService, private router: Router) { }

  ngOnInit() {
    this.addMerchantform = new FormGroup({
      'firstName':new FormControl(null,[Validators.required]),
      'lastName':new FormControl(null,[Validators.required]),
      'email':new FormControl(null,[Validators.required,Validators.email]),
      'phone':new FormControl(null,[Validators.required]),
      'dob':new FormControl(null,[Validators.required]),
      'companyName':new FormControl(null,[Validators.required]),
    })
  }

  generatePassword(){
    this.password = Math.random().toString(36).substring(2,9);
  }

  submit(){
    this.generatePassword();
    this.addMerchantform.value.password=this.password;
    console.log("submitted");
    this.router.navigate(['']);
    this.merchantService.addMerchant(this.addMerchantform.value);
  }
}
