import { Component, OnInit , ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Expense } from '../../expense';
import * as fromApp from '../../stateManagement/app.reducer';
import * as ExpenseActions from '../stateManagement/expense.action';
import * as fromExpense from '../stateManagement/expense.reducer';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { isNgTemplate } from '@angular/compiler';

@Component({
  selector: 'expenseTracker-overview',
  templateUrl: './expense-overview.component.html',
  styleUrls: ['./expense-overview.component.css']
})

export class ExpenseOverviewComponent implements OnInit {
  displayedColumns: string[] = ["id", "value", "reason", "date", "exchangeValue", "exchangeRate", "tag", "more"];
  expenseState: fromExpense.ExpenseState;
  expenses: MatTableDataSource<Expense>;
  //subscription: Subscription;
  
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  
  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    //this.subscription = 
    this.store.select('expense').subscribe(
      (expenseState: fromExpense.ExpenseState) => this.expenseState = expenseState);
    this.enableTableSorting();
    this.store.dispatch(new ExpenseActions.InitializeExpenseSuccess(this.expenseState));
  }

  private enableTableSorting() {
    this.expenses = new MatTableDataSource(this.expenseState.expenses);
    this.expenses.sortingDataAccessor = (expense, property) => {
      switch (property) {
        case 'value': return expense.amount.value;
        case 'tag': return expense.tags[0].name;
        case 'exchangeValue': return expense.exchangeValue.value;
        default: return expense[property];
      }
    };
    this.expenses.sort = this.sort;
  }

  /** Gets the total cost of all expenses. */
  getTotalCost(): number {
    return this.expenses.data.map(expense => expense.amount.value).reduce((acc, value) => acc + value, 0);
  }

  ngOnDestroy() {
    //this.subscription.unsubscribe();
  }

}