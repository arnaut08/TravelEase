import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MerchantService } from '../../merchant.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editmerchant',
  templateUrl: './editmerchant.component.html',
  styleUrls: ['./editmerchant.component.css']
})
export class EditmerchantComponent implements OnInit{
  editDetails;
  id;
  editMerchantform: FormGroup;

  constructor(private merchantService: MerchantService, private route: ActivatedRoute) { }
  
  ngOnInit() {
    this.editMerchantform = new FormGroup({
      'firstName':new FormControl(null,[Validators.required]),
      'lastName':new FormControl(null,[Validators.required]),
      'email':new FormControl(null,[Validators.required,Validators.email]),
      'phone':new FormControl(null,[Validators.required]),
      'dob':new FormControl(null,[Validators.required]),
      'companyName':new FormControl(null,[Validators.required]),
    });
    this.route.params.subscribe(resp=>{
      this.id=resp.id;
      this.merchantService.editMerchant(resp.id).subscribe(details=>{
        this.editDetails=details;
        this.editMerchantform.patchValue({
          'firstName':this.editDetails.firstName,
          'lastName':this.editDetails.lastName,
          'email':this.editDetails.email,
          'phone':this.editDetails.phone,
          'dob':this.editDetails.DOB.substring(0,10),
          'companyName':this.editDetails.companyName
        });
      })
    });       
  }

  submit(){
    this.merchantService.updateMerchant(this.id,this.editMerchantform.value)
  }
}
