import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';

import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { ManagemerchantComponent } from './managemerchant/managemerchant.component';
import { AddmerchantComponent } from './managemerchant/addmerchant/addmerchant.component';
import { ViewmerchantComponent } from './managemerchant/viewmerchant/viewmerchant.component';
import { EditmerchantComponent } from './managemerchant/editmerchant/editmerchant.component';
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
import { PaymentComponent } from './book/payment/payment.component';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    HomeComponent,
    LoginComponent,
    HeaderComponent,
    ManagemerchantComponent,
    AddmerchantComponent,
    ViewmerchantComponent,
    EditmerchantComponent,
    ManagebusesComponent,
    AddbusComponent,
    ViewbusesComponent,
    EditbusComponent,
    TimetableComponent,
    AddtimetableComponent,
    ViewtimetableComponent,
    EdittimetableComponent,
    SearchComponent,
    ResultComponent,
    BookComponent,
    TravellerComponent,
    PaymentComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FormsModule,
    DataTablesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
