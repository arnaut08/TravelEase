import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  resetPassword;
  loginForm: FormGroup;
  forgotpwForm: FormGroup;
  
  constructor(private http: HttpClient, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.resetPassword = false;
    this.loginForm = new FormGroup({
    'email':new FormControl(null,[Validators.required,Validators.email]),
    'password':new FormControl(null,[Validators.required])
    });
    this.forgotpwForm = new FormGroup({
      'email':new FormControl(null,[Validators.required,Validators.email])
    });
  }

  submitLogin(){
    this.authService.login(this.loginForm.value).subscribe(res=>{
      alert(res["msg"]);
      this.router.navigate(['']);
    })
  }

  reset(){
    this.authService.forgotPassword(this.forgotpwForm.value).subscribe(res=>{
      alert(res["msg"]);
      // this.router.navigate(['reset']);
    })

  }
}
