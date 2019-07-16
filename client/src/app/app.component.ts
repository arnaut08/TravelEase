import { Component, OnInit, OnChanges, DoCheck } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  loggedin=false;
  role=null;
  constructor(private authService: AuthService){
  }

  ngOnInit() {
    this.authService.autologin();
  }
}
