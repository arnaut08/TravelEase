import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProfileService } from '../profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {
  changePasswordForm : FormGroup;
  constructor(private profileService : ProfileService, private router : Router) { }

  ngOnInit() {
    this.changePasswordForm = new FormGroup({
      'oldPassword':new FormControl(null,[Validators.required]),
      'newPassword':new FormControl(null,[Validators.required]),
      'confirmPassword':new FormControl(null,[Validators.required]),
    });
  }

  updatePassword(){
    this.profileService.changePassword(this.changePasswordForm.value).subscribe(res=>{
      alert(res["msg"]);
      this.router.navigate(["profile"])
    });
  }
}
