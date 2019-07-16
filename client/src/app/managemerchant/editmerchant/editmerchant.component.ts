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
    this.route.params.subscribe(resp=>{
      this.id=resp.id;
      this.merchantService.editMerchant(resp.id).subscribe(details=>{
        this.editDetails=details;
        this.editMerchantform = new FormGroup({
          'firstName':new FormControl(this.editDetails.firstName,[Validators.required]),
          'lastName':new FormControl(this.editDetails.lastName,[Validators.required]),
          'email':new FormControl(this.editDetails.email,[Validators.required,Validators.email]),
          'phone':new FormControl(this.editDetails.phone,[Validators.required]),
          'dob':new FormControl(this.editDetails.DOB.substring(0,10),[Validators.required]),
          'companyName':new FormControl(this.editDetails.companyName,[Validators.required]),
        });
      })
    });       
  }

  submit(){
    this.merchantService.updateMerchant(this.id,this.editMerchantform.value)
  }
}
