import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TimetableService {

  constructor(private http: HttpClient, private router: Router) { }

  addTimetable(addTimetableform){
    this.http.post("http://localhost:3000/timetable/add",addTimetableform).subscribe(response=>{
      console.log(response);
      this.router.navigate(['bus/view'])
    })
  }

  getAllTimetables(){
    return this.http.get("http://localhost:3000/timetable")
  }

  getTimetables(id){
    return this.http.get("http://localhost:3000/"+id+"/timetable");
  }

  editTimetable(id){
    return this.http.get("http://localhost:3000/timetable/"+id);
  }

  updateTimetable(id,editTimetableform){
    this.http.put("http://localhost:3000/timetable/"+id,editTimetableform).subscribe(response=>{
      console.log(response);
      this.router.navigate(['bus/view']);
    })
  }

  deleteTimetable(id){
    this.http.delete("http://localhost:3000/timetable/"+id).subscribe(response=>{
      console.log(response);
      this.router.navigate(['bus/view']);
    })  
  }

}
