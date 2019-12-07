import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MatTableModule, MatIconModule, MatButtonModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { ExpenseOverviewComponent } from './expenseTracker/expenseOverview/expense-overview.component';
import * as fromApp from './stateManagement/app.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { FormsModule } from '@angular/forms';
import { EditExpenseComponent } from './expenseTracker/edit-expense/edit-expense.component';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  { path: 'expense-overview', component: ExpenseOverviewComponent },
  { path: 'edit-expense',      component: EditExpenseComponent },
  { path: '', redirectTo: '/expense-overview', pathMatch: 'full'},
  /*{ path: '**', component: PageNotFoundComponent }*/
];

@NgModule({
  declarations: [
    AppComponent,
    ExpenseOverviewComponent,
    EditExpenseComponent
  ],
  imports: [
    BrowserModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    StoreModule.forRoot(fromApp.appReducer, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictStateSerializability: true,
        strictActionSerializability: true,
      }
    }),
    !environment.production
      ? StoreDevtoolsModule.instrument()
      : []
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
