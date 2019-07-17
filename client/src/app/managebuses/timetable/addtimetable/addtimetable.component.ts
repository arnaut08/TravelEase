import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TimetableService } from 'src/app/timetable.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-addtimetable',
  templateUrl: './addtimetable.component.html',
  styleUrls: ['./addtimetable.component.css']
})
export class AddtimetableComponent implements OnInit {
  addTimetableform: FormGroup;
  id;

  constructor(private timetableService:TimetableService, private route:ActivatedRoute) { }

  ngOnInit() {
    this.route.parent.params.subscribe(param=>{
      this.id=param.id;
    });
    this.addTimetableform = new FormGroup({
      'source':new FormControl(null,[Validators.required]),
      'destination':new FormControl(null,[Validators.required]),
      'route':new FormControl(null,[Validators.required]),
      'date':new FormControl(null,[Validators.required]),
      'time':new FormControl(null,[Validators.required]),
      'capacity':new FormControl(null,[Validators.required]),
      'price':new FormControl(null,[Validators.required])
    })
  }

  submit(){
    this.addTimetableform.value.id=this.id;
    console.log(this.addTimetableform.value);
    this.timetableService.addTimetable(this.addTimetableform.value)    
  }
  
}
