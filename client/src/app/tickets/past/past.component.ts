import { Component, OnInit, OnDestroy } from '@angular/core';
import { BookingService } from 'src/app/booking.service';
import { Subject } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-past',
  templateUrl: './past.component.html',
  styleUrls: ['./past.component.css']
})
export class PastComponent implements OnInit, OnDestroy {
  dtOptions: DataTables.Settings = {};
  pastTickets;
  selectedId;
  ratingForm: FormGroup;
  dtTrigger = new Subject();

  constructor(private bookingService: BookingService, private router: Router) { }

  ngOnInit() {
    this.dtOptions={
      pagingType: 'full_numbers',
      pageLength: 2
    };

    this.bookingService.getPastTickets().subscribe(response=>{
      this.pastTickets=response;
      console.log(response);
      this.dtTrigger.next();
    })

    this.ratingForm = new FormGroup({
      'rating': new FormControl(null),
      'review': new FormControl(null)
    })
  }

  ngOnDestroy(){
    this.dtTrigger.unsubscribe();
  }

  rate(){
    this.ratingForm.value.journey = this.selectedId;
    console.log(this.ratingForm.value)
    this.bookingService.rate(this.ratingForm.value).subscribe(res=>{
      console.log(res);
      alert('Ratings submitted');
      this.router.navigate([''])
    })
  }
}
