import { Component, OnInit, OnDestroy } from '@angular/core';
import { BookingService } from 'src/app/booking.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-upcoming',
  templateUrl: './upcoming.component.html',
  styleUrls: ['./upcoming.component.css']
})
export class UpcomingComponent implements OnInit, OnDestroy {
  dtOptions: DataTables.Settings = {};
  upcomingTickets;
  dtTrigger = new Subject();

  constructor(private bookingService : BookingService) { }

  ngOnInit() {
    this.dtOptions={
      pagingType: 'full_numbers',
      pageLength: 2
    };

    this.bookingService.getUpcomingTickets().subscribe(response=>{
      this.upcomingTickets=response;
      this.dtTrigger.next();
    })
  } 

  ngOnDestroy(){
    this.dtTrigger.unsubscribe();
  }
}
