import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userDetails;
  constructor(private profileService : ProfileService, private router : Router) { }

  ngOnInit() {
    this.profileService.getUserDetails().subscribe(res=>{
      this.userDetails=res;
    });
  }
  
}
