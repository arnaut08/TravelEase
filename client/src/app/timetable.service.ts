import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Path } from './path';

@Injectable({
  providedIn: 'root'
})
export class TimetableService {

  constructor(private http: HttpClient, private router: Router) { }

  addTimetable(addTimetableform){
    this.http.post(`${Path.currentPath}/timetable/add`,addTimetableform).subscribe(res=>{
      alert(res['msg']);
      this.router.navigate(['bus/view'])
    })
  }

  getAllTimetables(){
    return this.http.get(`${Path.currentPath}/timetable`)
  }

  getTimetables(id){
    return this.http.get(Path.currentPath+"/"+id+"/timetable");
  }

  editTimetable(id){
    return this.http.get(`${Path.currentPath}/timetable/`+id);
  }

  updateTimetable(id,editTimetableform){
    this.http.put(`${Path.currentPath}/timetable/`+id,editTimetableform).subscribe(res=>{
      alert(res['msg']);
      this.router.navigate(['bus/view']);
    })
  }

  deleteTimetable(id){
    this.http.delete(`${Path.currentPath}/timetable/`+id).subscribe(res=>{
      alert(res['msg']);      
      this.router.navigate(['bus/view']);
    })  
  }

}
