import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TimetableService } from 'src/app/timetable.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edittimetable',
  templateUrl: './edittimetable.component.html',
  styleUrls: ['./edittimetable.component.css']
})
export class EdittimetableComponent implements OnInit {
  id;
  editTimetabledetails;
  editTimetableform : FormGroup;
  constructor(private timetableService:TimetableService, private route:ActivatedRoute) { }

  ngOnInit() {
    this.editTimetableform = new FormGroup({
      'source':new FormControl(null,[Validators.required]),
      'destination':new FormControl(null,[Validators.required]),
      'route':new FormControl(null,[Validators.required]),
      'date':new FormControl(null,[Validators.required]),
      'time':new FormControl(null,[Validators.required]),
      'capacity':new FormControl(null,[Validators.required]),
      'price':new FormControl(null,[Validators.required])
    });
    this.route.params.subscribe(param=>{
      this.id=param.id;
      this.timetableService.editTimetable(this.id).subscribe(details=>{
        console.log(details)
        this.editTimetabledetails=details;
        this.editTimetableform.patchValue({
          'source':this.editTimetabledetails.source,
          'destination':this.editTimetabledetails.destination,
          'route':this.editTimetabledetails.route,
          'date':this.editTimetabledetails.date.substring(0,10),
          'time':this.editTimetabledetails.time,
          'capacity':this.editTimetabledetails.capacity,
          'price':this.editTimetabledetails.price
        })
      })
    })
  }

  submit(){
    this.timetableService.updateTimetable(this.id,this.editTimetableform.value)
  }

}
