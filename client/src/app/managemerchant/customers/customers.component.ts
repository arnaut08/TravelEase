import { Component, OnInit, OnDestroy } from '@angular/core';
import { MerchantService } from 'src/app/merchant.service';
import { Router, ActivatedRoute } from '@angular/router';
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
  constructor(private merchantService: MerchantService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.dtOptions={
      pagingType: 'full_numbers',
      pageLength: 2
    };
    this.route.params.subscribe(param=>{
      this.merchantService.getCustomers(param.id).subscribe(response=>{
        this.customers=response;
        this.dtTrigger.next();
      })      
    });
  }

  ngOnDestroy(){
    this.dtTrigger.unsubscribe();
  }
}
