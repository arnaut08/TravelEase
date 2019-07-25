import { Component, OnInit } from '@angular/core';
import { BookingService } from 'src/app/booking.service';

@Component({
  selector: 'app-past',
  templateUrl: './past.component.html',
  styleUrls: ['./past.component.css']
})
export class PastComponent implements OnInit {

  constructor(private bookingService: BookingService) { }

  ngOnInit() {
    this.bookingService.getPastTickets().subscribe(response=>{
      console.log(response)
    })
  }

}
