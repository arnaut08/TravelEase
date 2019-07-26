import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  expirationTimer;
  constructor(private http:HttpClient,private router: Router) { }
  register(regForm){
    return this.http.post("http://localhost:3000/signup",regForm)
  }

  login(email,pass){
    return this.http.post<{email:string,token:string,expiry:Number,msg:string,role:string}>( 'http://localhost:3000/login',
    {email:email, password: pass}).pipe(tap(resp=>{
      if(resp.msg!="Error"){
        console.log(resp);
        this.auth(email,resp.token, +resp.expiry, resp.role);}
    }));
  }

  autologin(){
    const localData:{email:string,
      _token:string,
      _tokenExpirationDate: Date,
      role:string} = JSON.parse(localStorage.getItem('localData'));
    if(!localData){
      return;
    }

    const oldUser= new User(localData.email,localData._token,new Date(localData._tokenExpirationDate),localData.role);
  
    if(oldUser.token){
      this.user.next(oldUser) ;
      const expirationTime = new Date(localData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autologout(expirationTime)
    }
  }
  
  logout(){
    this.user.next(null);
    this.router.navigate(['login']);
    localStorage.removeItem('localData')
    if(this.expirationTimer){
      clearTimeout(this.expirationTimer)
    }
    this.expirationTimer=null;
  }

  autologout(expirationTime){
    this.expirationTimer = setTimeout(()=>{
      this.logout();
    },expirationTime)
  }

  auth(email,token,expiry,role){
    const expiryDate = new Date(new Date().getTime()+expiry);
    const user = new User(email,token,expiryDate,role);
    this.user.next(user);
    this.autologout(expiry);
    localStorage.setItem('localData', JSON.stringify(user));
  }
}
