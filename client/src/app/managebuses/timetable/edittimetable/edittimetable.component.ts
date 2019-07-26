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
    this.route.params.subscribe(param=>{
      this.id=param.id;
      this.timetableService.editTimetable(this.id).subscribe(details=>{
        console.log(details)
        this.editTimetabledetails=details;
        this.editTimetableform = new FormGroup({
          'source':new FormControl(this.editTimetabledetails.source,[Validators.required]),
          'destination':new FormControl(this.editTimetabledetails.destination,[Validators.required]),
          'route':new FormControl(this.editTimetabledetails.route,[Validators.required]),
          'date':new FormControl(this.editTimetabledetails.date,[Validators.required]),
          'time':new FormControl(this.editTimetabledetails.time,[Validators.required]),
          'capacity':new FormControl(this.editTimetabledetails.capacity,[Validators.required]),
          'price':new FormControl(this.editTimetabledetails.price,[Validators.required])
        })
      })
    })
  }

  submit(){
    this.timetableService.updateTimetable(this.id,this.editTimetableform.value)
  }

}
