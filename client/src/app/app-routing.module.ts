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
import { CustomersComponent } from './managemerchant/customers/customers.component';
import { CustomersComponent as AllCustomers } from './customers/customers.component'
import { TicketsComponent } from './tickets/tickets.component';
import { PastComponent } from './tickets/past/past.component';
import { UpcomingComponent } from './tickets/upcoming/upcoming.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { ProfileComponent } from './profile/profile.component';
import { UploadpicComponent } from './uploadpic/uploadpic.component';
import { EditprofileComponent } from './profile/editprofile/editprofile.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';

const appRoutes: Routes = [
    { path: '',canActivate:[AuthGuard], component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'profile',canActivate:[AuthGuard], component: ProfileComponent },
    { path: 'profile/edit',canActivate:[AuthGuard], component: EditprofileComponent },
    { path: 'changePassword',canActivate:[AuthGuard], component: ChangepasswordComponent },
    { path: 'upload',canActivate:[AuthGuard], component: UploadpicComponent },
    { path: 'merchant',canActivate:[AuthGuard], data : {role:"admin"} , component: ManagemerchantComponent, children:[
      { path: 'add', component: AddmerchantComponent },
      { path: 'view', component: ViewmerchantComponent },
      { path: 'edit/:id', component: EditmerchantComponent },
      { path: ':id/customers', component: CustomersComponent }
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
    ]},
    { path: 'customers', canActivate:[AuthGuard], component: AllCustomers , data : {role:"merchant"} },
    { path: 'tickets', canActivate:[AuthGuard], component: TicketsComponent, data : {role:"user"}, children:[ 
      { path: 'past', component: PastComponent},
      { path: 'upcoming', component: UpcomingComponent}      
    ]},
    { path: 'reset', component: ResetpasswordComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}