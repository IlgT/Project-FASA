import { Component, OnInit } from '@angular/core';
import { Expense } from '../../expense';
import { Store } from '@ngrx/store';
import * as ExpenseActions from '../stateManagement/expense.action';
import * as fromExpense from '../stateManagement/expense.reducer';
import * as fromApp from '../../stateManagement/app.reducer';

@Component({
  selector: 'expenseTracker-overview',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit {
  displayedColumns: string[] = ["id", "value", "reason", "date", "exchangeValue", "exchangeRate", "tag", "more"];

  expenseState: fromExpense.ExpenseState;
  expenses: Expense[];
  //subscription: Subscription;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    //this.subscription = 
    this.store.select('expense').subscribe(
      (expenseState: fromExpense.ExpenseState) => this.expenseState = expenseState);
    this.expenses = this.expenseState.expenses
    this.store.dispatch(new ExpenseActions.InitializeExpenseSuccess(this.expenseState));
  }

  /** Gets the total cost of all expenses. */
  getTotalCost(): number {
    return this.expenses.map(expense => expense.amount.value).reduce((acc, value) => acc + value, 0);
  }

  ngOnDestroy() {
    //this.subscription.unsubscribe();
  }

}