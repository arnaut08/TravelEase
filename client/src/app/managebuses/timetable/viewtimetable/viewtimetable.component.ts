import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { TimetableService } from 'src/app/timetable.service';

@Component({
  selector: 'app-viewtimetable',
  templateUrl: './viewtimetable.component.html',
  styleUrls: ['./viewtimetable.component.css']
})
export class ViewtimetableComponent implements OnInit, OnDestroy{
  id;
  dtOptions: DataTables.Settings = {};
  timetables;
  dtTrigger = new Subject();
  constructor(private route:ActivatedRoute, private timetableService: TimetableService, private router:Router) { }

  ngOnInit() {
    this.dtOptions={
      pagingType: 'full_numbers',
      pageLength: 2
    };
    this.route.parent.params.subscribe(param=>{
      this.id=param.id
      this.timetableService.getTimetables(this.id).subscribe(timetables=>{
        this.timetables=timetables;
        this.dtTrigger.next();
      })
    });
  }

  edit(id){
    this.router.navigate(['bus/'+this.id+"/timetable/edit/"+id]);
  }

  delete(id){
    this.timetableService.deleteTimetable(id);
  }

  ngOnDestroy(){
    this.dtTrigger.unsubscribe();
  }
}
