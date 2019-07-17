import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth.guard';

import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ManagemerchantComponent } from './managemerchant/managemerchant.component';
import { AddmerchantComponent } from './managemerchant/addmerchant/addmerchant.component';
import { ViewmerchantComponent } from './managemerchant/viewmerchant/viewmerchant.component';
import { EditmerchantComponent } from './managemerchant/editmerchant/editmerchant.component'
import { ManagebusesComponent } from './managebuses/managebuses.component';
import { AddbusComponent } from './managebuses/addbus/addbus.component';
import { ViewbusesComponent } from './managebuses/viewbuses/viewbuses.component';
import { EditbusComponent } from './managebuses/editbus/editbus.component';
import { TimetableComponent } from './managebuses/timetable/timetable.component';
import { AddtimetableComponent } from './managebuses/timetable/addtimetable/addtimetable.component';
import { ViewtimetableComponent } from './managebuses/timetable/viewtimetable/viewtimetable.component';
import { EdittimetableComponent } from './managebuses/timetable/edittimetable/edittimetable.component';
import { SearchComponent } from './search/search.component';
import { ResultComponent } from './search/result/result.component';
import { BookComponent } from './book/book.component';
import { TravellerComponent } from './book/traveller/traveller.component';

const appRoutes: Routes = [
    { path: '',canActivate:[AuthGuard], component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'merchant',canActivate:[AuthGuard], data : {role:"admin"} , component: ManagemerchantComponent, children:[
      { path: 'add', component: AddmerchantComponent },
      { path: 'view', component: ViewmerchantComponent },
      { path: 'edit/:id', component: EditmerchantComponent }
    ]},
    { path: 'bus',canActivate:[AuthGuard], data : {role:"merchant"} , component: ManagebusesComponent, children:[
      { path: 'add', component: AddbusComponent },
      { path: 'view', component: ViewbusesComponent },
      { path: 'edit/:id', component: EditbusComponent },
      { path: ':id/timetable', component: TimetableComponent , children:[
        {path: 'add', component: AddtimetableComponent },
        { path: 'view', component: ViewtimetableComponent },
        { path: 'edit/:id', component: EdittimetableComponent }
      ]},
    ]},
    { path: 'search', canActivate:[AuthGuard], data : {role:"user"} , component: SearchComponent},
    { path: 'result', canActivate:[AuthGuard], component: ResultComponent, data : {role:"user"} },
    { path: 'book', canActivate:[AuthGuard], component: BookComponent, data : {role:"user"}, children:[ 
    { path: ':id', component: TravellerComponent}

    ]}

];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}