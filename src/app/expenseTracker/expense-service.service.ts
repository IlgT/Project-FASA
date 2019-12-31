import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as ExpenseActions  from '../expenseTracker/stateManagement/expense.action';
import * as fromExpense from './stateManagement/expense.reducer';
import * as fromApp from '../stateManagement/app.reducer';
import { ExpenseFilter } from './ExpenseFilter';
import { Observable, of } from 'rxjs';
import { Expense } from '../expense';
import { EXPENSES } from '../expense.testdata';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  constructor(private store: Store<fromApp.AppState>) { }
 
  loadExpenseListByFilter(): Observable<Expense[]> {
    const filter: ExpenseFilter = this.generateExpenseFilter();
    console.log("HTTP-CALL for loading all expense by filter");
    return of(EXPENSES);
  }

  addExpense(): Observable<Expense> {
    console.log("HTTP-CALL for adding a expense");
    return of(null);
  }

  modifyExpense(): Observable<Expense> {
    console.log("HTTP-CALL for modifying a expense");
    var expense: Expense;
    this.store.select('expense').subscribe(
      (expenseState: fromExpense.ExpenseState) => {
        expense = expenseState.actualExpense;
      });
    return of(expense);
  }

  deleteExpense(): Observable<Expense> {
    console.log("HTTP-CALL for deleting a expense");
    return of(null);
  }

  loadUtilizedValuesForFilter(): Observable<ExpenseFilter> {
    console.log("HTTP-CALL for loading all utilized reasons, months and tags for filter dropdowns");
    return of({
      reasons: ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'],
      months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      tags: ["Shopping"]
    });
  }
  
  updateFilters(expense: Expense): Observable<ExpenseFilter> {
    let updatedFilters: ExpenseFilter;
    this.store.select('expenseFilter')
      .subscribe(expenseFilterState => 
        updatedFilters = {
          reasons: [...expenseFilterState.utilizedReasons],
          months: [...expenseFilterState.utilizedMonths],
          tags: [...expenseFilterState.utilizedTags],
        });
    if (!updatedFilters.reasons.includes(expense.reason)) {
      updatedFilters.reasons.push(expense.reason);
    }
    let month: number = +expense.date.substr(6, 2);
    if (!updatedFilters.months.includes(month)) {
      updatedFilters.months.push(month);
    }
    for (let tag of expense.tags) {
      if(!updatedFilters.tags.includes(tag.name)) {
        updatedFilters.tags.push(tag.name);
      }
    }
    return of(updatedFilters);
  }

  private generateExpenseFilter(): ExpenseFilter {
    return null;
  }
}
