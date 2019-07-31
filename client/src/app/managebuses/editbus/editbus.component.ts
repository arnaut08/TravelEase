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
    this.editBusform = new FormGroup({
      'busTitle':new FormControl(null,[Validators.required]),
      'busDescription':new FormControl(null,[Validators.required]),
      'busCategory':new FormControl(null,[Validators.required]),
      'terms':new FormControl(null,[Validators.required]),
     });
    this.route.params.subscribe(resp=>{
      this.id=resp.id;
      this.busService.editBus(resp.id).subscribe(details=>{
        this.editDetails=details;
        this.editBusform.patchValue({
          'busTitle':this.editDetails.busTitle,
          'busDescription':this.editDetails.busDescription,
          'busCategory':this.editDetails.busCategory,
          'terms':this.editDetails.terms
         })
      })
    });
  }

  submit(){
    this.busService.updateBus(this.id,this.editBusform.value)
  }
}
