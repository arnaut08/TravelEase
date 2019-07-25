import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { MerchantService } from '../../merchant.service';

@Component({
  selector: 'app-viewmerchant',
  templateUrl: './viewmerchant.component.html',
  styleUrls: ['./viewmerchant.component.css']
})
export class ViewmerchantComponent implements OnInit, OnDestroy {
  dtOptions: DataTables.Settings = {};
  merchants;
  dtTrigger = new Subject();

  constructor(private merchantService:MerchantService, private router: Router) { }

  ngOnInit() {
    this.dtOptions={
      pagingType: 'full_numbers',
      pageLength: 2
    };

    this.merchantService.getMerchants().subscribe(merchants=>{
      this.merchants=merchants;
      this.dtTrigger.next();
    })
  }
  
  edit(id){
    this.router.navigate(['merchant/edit/'+id])
  }

  delete(id){
    this.merchantService.deleteMerchant(id);
  }

  viewCustomers(id){
    this.router.navigate(['merchant/'+id+'/customers'])
  }

  ngOnDestroy(){
    this.dtTrigger.unsubscribe();
  }
}
