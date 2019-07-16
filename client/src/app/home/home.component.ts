import { Component, OnInit, DoCheck } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap, take, exhaustMap } from 'rxjs/operators';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, DoCheck {
  role:string;
  constructor(private authService: AuthService) { }
  
  ngOnInit() {
  
  }

  ngDoCheck(){
    if(this.authService.user.value!=null){this.role=this.authService.user.value.role}    
  }

}
