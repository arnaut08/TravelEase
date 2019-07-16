import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { MerchantService } from 'src/app/merchant.service';
import { Router } from '@angular/router';
import { BusService } from 'src/app/bus.service';

@Component({
  selector: 'app-viewbuses',
  templateUrl: './viewbuses.component.html',
  styleUrls: ['./viewbuses.component.css']
})
export class ViewbusesComponent implements OnInit, OnDestroy {
  dtOptions: DataTables.Settings = {};
  buses;
  dtTrigger = new Subject();
  
  constructor(private busService:BusService, private router: Router) { }

  ngOnInit() {
    this.dtOptions={
      pagingType: 'full_numbers',
      pageLength: 2
    };
    this.busService.getBuses().subscribe(buses=>{
      this.buses=buses;
      this.dtTrigger.next();
    })
  }
  
  edit(id){
    this.router.navigate(['bus/edit/'+id]);
  }

  delete(id){
    this.busService.deleteBus(id);
  }

  addTimetable(id){
    this.router.navigate(['bus/'+id+"/timetable/add"]);
  }

  viewTimetable(id){

  }

  ngOnDestroy(){
    this.dtTrigger.unsubscribe();
  }

}
