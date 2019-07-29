import { Component, OnInit, OnDestroy, OnChanges, AfterContentInit, AfterContentChecked, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BusService } from 'src/app/bus.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-viewbuses',
  templateUrl: './viewbuses.component.html',
  styleUrls: ['./viewbuses.component.css']
})
export class ViewbusesComponent implements OnInit{
  buses;
  pages=[];
  searchForm : FormGroup;
  subscription : Subscription;
  constructor(private busService:BusService, private router: Router, private route: ActivatedRoute) { }

  
  ngOnInit() {
    this.searchForm = new FormGroup({
      'search':new FormControl(null)
     })
    console.log(this.searchForm.value)
    this.getData();
    this.getCount();
  }

  getData(searchVal=""){
    this.subscription = this.route.params.subscribe(params=>{
      this.busService.getbuses(params["page"],searchVal).subscribe(buses=>{
        this.buses=buses;
      })
    });
  }

  getCount(searchVal=""){
    this.busService.getBusesCount(searchVal).subscribe(res=>{
      this.getPages(res["count"])
    });        
  }

  getPages(count){
    this.pages=[];
    for(let i = 1;i<Math.round(count/2)+1;i++){
      this.pages.push(i)
    }
  }

  search(){
    this.getData(this.searchForm.value.search);
    this.getCount(this.searchForm.value.search);
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
    this.router.navigate(['bus/'+id+"/timetable/view"])
  }
  
}
