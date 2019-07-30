import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Path } from './path';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  
  constructor(private http: HttpClient, private authService: AuthService) { }

  getPrice(id){
    return this.http.get(`${Path.currentPath}/timetable/`+id+"/price")
  }

  getPastTickets(){
    return this.http.get(`${Path.currentPath}/tickets/past`)
  }

  getUpcomingTickets(){
    return this.http.get(`${Path.currentPath}/tickets/upcoming`)
  }
  
  rate(ratingForm){
    return this.http.post(`${Path.currentPath}/rating`,ratingForm)
  }
}
