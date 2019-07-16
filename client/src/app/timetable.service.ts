import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TimetableService {

  constructor(private http: HttpClient, private router: Router) { }

  addTimetable(addTimetableform){
    console.log(addTimetableform);
    
    this.http.post("http://localhost:3000/timetable/add",addTimetableform).subscribe(response=>{
      console.log(response);
    })
  }
}
