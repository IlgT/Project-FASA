import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MatTableModule, MatIconModule, MatButtonModule, MatSortModule, MatChipsModule,
         MatInputModule, MatFormFieldModule, MatAutocompleteModule, MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSelectModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { ExpenseOverviewComponent } from './expenseTracker/expenseOverview/expense-overview.component';
import * as fromApp from './stateManagement/app.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditExpenseComponent } from './expenseTracker/edit-expense/edit-expense.component';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  { path: 'expenses', component: ExpenseOverviewComponent },
  { path: 'expense/:type', component: EditExpenseComponent },
  { path: '', redirectTo: '/expenses', pathMatch: 'full'},
  /*{ path: '**', component: PageNotFoundComponent }*/
];

@NgModule({
  declarations: [
    AppComponent,
    ExpenseOverviewComponent,
    EditExpenseComponent,
  ],
  imports: [
    BrowserModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatChipsModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
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
  providers: [
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: 
      {duration: 750000,  panelClass: ['black-lightblue-snackbar']}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
