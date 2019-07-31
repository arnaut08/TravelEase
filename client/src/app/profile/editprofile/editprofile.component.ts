import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProfileService } from 'src/app/profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {
  editProfileForm : FormGroup;
  constructor(private profileService : ProfileService, private router : Router) { }

  ngOnInit() {
    this.editProfileForm = new FormGroup({
      'firstName':new FormControl(null,[Validators.required]),
      'lastName':new FormControl(null,[Validators.required]),
      'phone':new FormControl(null,[Validators.required]),
      'dob':new FormControl(null,[Validators.required]),
    });

    this.profileService.getUserDetails().subscribe(userDetails=>{
      this.editProfileForm.patchValue({
        firstName : userDetails["firstName"],
        lastName : userDetails["lastName"],
        phone : userDetails["phone"],
        dob : userDetails["DOB"].substring(0,10)
      })    
    });
    
  }

  edit(){
    this.profileService.editProfile(this.editProfileForm.value).subscribe(res=>{
      alert(res["msg"]);
      this.router.navigate(["profile"])
    })
  }
}
