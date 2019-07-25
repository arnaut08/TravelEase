import { Component, OnInit } from '@angular/core';
import { BookingService } from 'src/app/booking.service';

@Component({
  selector: 'app-upcoming',
  templateUrl: './upcoming.component.html',
  styleUrls: ['./upcoming.component.css']
})
export class UpcomingComponent implements OnInit {

  constructor(private bookingService : BookingService) { }

  ngOnInit() {
    this.bookingService.getUpcomingTickets().subscribe(response=>{
      console.log(response)
    })
  }

}
