import { Component, OnInit } from '@angular/core';
import { BusService } from 'src/app/bus.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-editbus',
  templateUrl: './editbus.component.html',
  styleUrls: ['./editbus.component.css']
})
export class EditbusComponent implements OnInit {
  id;
  editDetails;
  editBusform: FormGroup;

  constructor(private busService:BusService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(resp=>{
      this.id=resp.id;
      this.busService.editBus(resp.id).subscribe(details=>{
        this.editDetails=details;
        this.editBusform = new FormGroup({
          'busTitle':new FormControl(this.editDetails.busTitle,[Validators.required]),
          'busDescription':new FormControl(this.editDetails.busDescription,[Validators.required]),
          'busCategory':new FormControl(this.editDetails.busCategory,[Validators.required]),
          'terms':new FormControl(this.editDetails.terms,[Validators.required]),
         })
      })
    });
  }

  submit(){
    this.busService.updateBus(this.id,this.editBusform.value)
  }
}
