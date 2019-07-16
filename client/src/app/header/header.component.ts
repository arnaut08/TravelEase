import { Component, OnInit, DoCheck } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, DoCheck {
  loggedin:boolean =false;
  role:string;
  constructor(private authService : AuthService) { }

  ngOnInit() {
    this.authService.user.subscribe(
      user=>{
        this.loggedin=!!user;
      }
     )
  }

  ngDoCheck(){
    if(this.authService.user.value!=null){this.role=this.authService.user.value.role}    
  }

  logout(){
    this.role=null;
    this.authService.logout();
  }
}
