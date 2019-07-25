import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  
  constructor(private http: HttpClient, private authService: AuthService) { }

  getPrice(id){
    return this.http.get("http://localhost:3000/timetable/"+id+"/price")
  }

  getPastTickets(){
    return this.http.get(`http://localhost:3000/tickets/past?email=${this.authService.user.value.email}`)
  }

  getUpcomingTickets(){
    return this.http.get(`http://localhost:3000/tickets/upcoming?email=${this.authService.user.value.email}`)
  }
}
