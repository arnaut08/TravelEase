import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth.service';
import { BusService } from 'src/app/bus.service';

@Component({
  selector: 'app-addbus',
  templateUrl: './addbus.component.html',
  styleUrls: ['./addbus.component.css']
})
export class AddbusComponent implements OnInit {
  addBusform : FormGroup;
  constructor(private authService: AuthService, private busService:BusService) { }

  ngOnInit() {
    this.addBusform = new FormGroup({
      'busTitle':new FormControl(null,[Validators.required]),
      'busDescription':new FormControl(null,[Validators.required]),
      'busCategory':new FormControl("AC-Sleeper",[Validators.required]),
      'terms':new FormControl(null,[Validators.required]),
     })
  }

  submit(){
    this.addBusform.value.email=this.authService.user.value.email;
    this.busService.addBus(this.addBusform.value);
  }

}
