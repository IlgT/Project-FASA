import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MatTableModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { ExpensesComponent } from './expenseTracker/expenseOverview/expenses.component';
import * as fromApp from './stateManagement/app.reducer';

@NgModule({
  declarations: [
    AppComponent,
    ExpensesComponent
  ],
  imports: [
    BrowserModule,
    MatTableModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(fromApp.appReducer)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
