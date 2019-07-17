import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators  } from '@angular/forms';

@Component({
  selector: 'app-traveller',
  templateUrl: './traveller.component.html',
  styleUrls: ['./traveller.component.css']
})
export class TravellerComponent implements OnInit {
  count=1;
  travellerform: FormGroup;
  constructor() { }

  ngOnInit() {
    if(this.count==4){this.travellerform = new FormGroup({
      'traveller1':new FormControl(null,[Validators.required]),
      'traveller2':new FormControl(null,[Validators.required]),
      'traveller3':new FormControl(null,[Validators.required]),
      'traveller4':new FormControl(null,[Validators.required]),
     })} else if(this.count==3){this.travellerform = new FormGroup({
      'traveller1':new FormControl(null,[Validators.required]),
      'traveller2':new FormControl(null,[Validators.required]),
      'traveller3':new FormControl(null,[Validators.required])
     })} else if(this.count==2){this.travellerform = new FormGroup({
      'traveller1':new FormControl(null,[Validators.required]),
      'traveller2':new FormControl(null,[Validators.required]),
     })} else {this.travellerform = new FormGroup({
      'traveller1':new FormControl(null,[Validators.required])
     })}
  }

  counter(){
    this.count+=1;
  }
}
