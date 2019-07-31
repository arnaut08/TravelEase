import { Component, OnInit} from '@angular/core';
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
  searchVal;
  searchForm : FormGroup;
  subscription : Subscription;
  constructor(private busService:BusService, private router: Router, private route: ActivatedRoute) { }

  
  ngOnInit() {
    this.searchForm = new FormGroup({
      'search':new FormControl(null)
     })
    console.log(this.searchForm.value)
    this.getCount();
    this.getData();
  }

  getData(){
    this.route.queryParams.subscribe(params=>{
      if(!params["page"]){
        console.log("called")
        this.busService.getbuses(1,"").subscribe(buses=>{
          this.buses=buses;
        })
      }else if(!params["search"]){
        this.busService.getbuses(params["page"],"").subscribe(buses=>{
          this.buses=buses;
        })
      } else {
        this.busService.getbuses(params["page"],params["search"]).subscribe(buses=>{
          this.buses=buses;
        })
      }
    })
  }

  getCount(){
    this.route.queryParams.subscribe(params=>{
      if(!params["search"]){
        this.busService.getBusesCount("").subscribe(res=>{
          this.getPages(res["count"])
        });
      } else {
        this.busService.getBusesCount(params["search"]).subscribe(res=>{
          this.getPages(res["count"])
        });
      }
      
    })
            
  }

  getPages(count){
    this.pages=[];
    for(let i = 1;i<Math.round(count/2)+1;i++){
      this.pages.push(i)
    }
  }

  search(){
    this.searchVal = this.searchForm.value.search ;
    this.router.navigate(['/bus/view'],{ queryParams: { page:1 , search : this.searchForm.value.search} })
    // this.getData(this.searchForm.value.search);
    // this.getCount(this.searchForm.value.search);
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
