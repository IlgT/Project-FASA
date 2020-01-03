import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MatTableModule, MatIconModule, MatButtonModule, MatSortModule, MatChipsModule,
         MatInputModule, MatFormFieldModule, MatAutocompleteModule, MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSelectModule, MatDialogModule, MatExpansionModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { ExpenseOverviewComponent } from './expenseTracker/expenseOverview/expense-overview.component';
import * as fromApp from './stateManagement/app.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditExpenseComponent } from './expenseTracker/edit-expense/edit-expense.component';
import { RouterModule, Routes } from '@angular/router';
import { ContextMenuComponent } from './context-menu/context-menu.component';
import { NoMistakeComponent } from './no-mistake/no-mistake.component';
import { ExpensesFilterComponent } from './expenseTracker/expenseOverview/expenses-filter/expenses-filter.component';
import { ExpenseEffects } from './expenseTracker/stateManagement/expense.effects';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule, RouterState } from '@ngrx/router-store';

const appRoutes: Routes = [
  { path: 'expenses', component: ExpenseOverviewComponent },
  { path: 'expense', component: EditExpenseComponent },
  { path: '', redirectTo: '/expenses', pathMatch: 'full'},
  /*{ path: '**', component: PageNotFoundComponent }*/
];

@NgModule({
  declarations: [
    AppComponent,
    ExpenseOverviewComponent,
    EditExpenseComponent,
    ContextMenuComponent,
    NoMistakeComponent,
    ExpensesFilterComponent,
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
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    EffectsModule.forRoot([ExpenseEffects]),
    RouterModule.forRoot(appRoutes),
    StoreRouterConnectingModule.forRoot({
      routerState: RouterState.Minimal
    }),
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
