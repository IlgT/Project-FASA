import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MatTableModule, MatIconModule, MatButtonModule, MatSortModule, MatChipsModule,
         MatInputModule, MatFormFieldModule, MatAutocompleteModule, MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { ExpenseOverviewComponent } from './expenseTracker/expenseOverview/expense-overview.component';
import * as fromApp from './stateManagement/app.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditExpenseComponent } from './expenseTracker/edit-expense/edit-expense.component';
import { RouterModule, Routes } from '@angular/router';
import { SnackbarUserFeedbackComponent } from './snackbar-user-feedback/snackbar-user-feedback.component';

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
    EditExpenseComponent,
    SnackbarUserFeedbackComponent
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
  entryComponents: [
    SnackbarUserFeedbackComponent,
  ],
  providers: [
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: 
      {duration: 750,  panelClass: ['black-lightblue-snackbar']}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
