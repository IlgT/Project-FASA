import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MatTableModule, MatIconModule, MatButtonModule, MatSortModule, MatChipsModule,
         MatInputModule, MatFormFieldModule, MatAutocompleteModule, MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSelectModule, MatDialogModule, MatExpansionModule, MatProgressSpinnerModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { ExpenseOverviewComponent } from './expenseTracker/expenseOverview/expense-overview.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditExpenseComponent } from './expenseTracker/edit-expense/edit-expense.component';
import { RouterModule, Routes } from '@angular/router';
import { ExpensesFilterComponent } from './expenseTracker/expenseOverview/expenses-filter/expenses-filter.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule, RouterState } from '@ngrx/router-store';
import { NgxCurrencyModule } from "ngx-currency";
import { PageNotFoundComponent } from './commons/page-not-found/page-not-found.component';
import { GreaterThanZeroValidator } from './commons/services/greaterThanZeroValidator';
import { LoadingSpinnerComponent } from './commons/loading-spinner/loading-spinner.component';
import { ExpenseEffects } from './expenseTracker/expense.effects';
import { appReducers } from './reducers/app.reducers';
import { ContextMenuComponent } from './commons/context-menu/context-menu.component';
import { NoMistakeComponent } from './commons/no-mistake/no-mistake.component';

const appRoutes: Routes = [
  { path: 'expenses', component: ExpenseOverviewComponent },
  { path: 'expense', component: EditExpenseComponent },
  { path: '', redirectTo: '/expenses', pathMatch: 'full'},
  { path: '404', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/404' }
];

export const customCurrencyMaskConfig = {
  align: "left",
  allowNegative: false,
  allowZero: false,
  decimal: ",",
  precision: 2,
  prefix: "",
  suffix: "",
  thousands: ".",
  nullable: false
};

@NgModule({
  declarations: [
    AppComponent,
    ExpenseOverviewComponent,
    EditExpenseComponent,
    ContextMenuComponent,
    NoMistakeComponent,
    ExpensesFilterComponent,
    GreaterThanZeroValidator,
    PageNotFoundComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatChipsModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    FormsModule,
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
    BrowserAnimationsModule,
    EffectsModule.forRoot([ExpenseEffects]),
    RouterModule.forRoot(appRoutes),
    StoreRouterConnectingModule.forRoot({
      routerState: RouterState.Minimal
    }),
    StoreModule.forRoot(appReducers, {
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
    ContextMenuComponent,
    NoMistakeComponent
  ],
  providers: [
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: 
      {duration: 1500,  panelClass: ['success-snackbar']}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
