import { Component, OnInit, OnDestroy } from '@angular/core';
import { MerchantService } from '../merchant.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit, OnDestroy {
  dtOptions: DataTables.Settings = {};
  customers;
  dtTrigger = new Subject();
  constructor(private merchantService: MerchantService) { }

  ngOnInit() {
    this.dtOptions={
      pagingType: 'full_numbers',
      pageLength: 2
    };
    this.merchantService.getAllcustomers().subscribe(response=>{
      console.log(response)
      this.customers=response;
      this.dtTrigger.next();
    })
  }

  ngOnDestroy(){
    this.dtTrigger.unsubscribe();
  }
}
