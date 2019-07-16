import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  regform: FormGroup;
  constructor(private http: HttpClient, private authService: AuthService, private router: Router) {  }

  ngOnInit(){
    this.regform = new FormGroup({
      'firstName':new FormControl(null,[Validators.required]),
      'lastName':new FormControl(null,[Validators.required]),
      'email':new FormControl(null,[Validators.required,Validators.email]),
      'phone':new FormControl(null,[Validators.required]),
      'dob':new FormControl(null,[Validators.required]),
      'password':new FormControl(null,[Validators.required]),
    });
  }

  display(regForm){
    this.authService.register(regForm).subscribe(res=>{
      this.router.navigate(['login'])
    })
  }
}
