import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
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
    let filters: ExpenseFilter = {
      reasons: [],
      months: [],
      tags: []
    }

    let expenses: Expense[];
    this.store.select('expense')
      .subscribe(expenseState => expenses = expenseState.expenses);

    for (let expense of expenses) {
      if (filters.reasons
        .filter(reason => reason.toLowerCase().indexOf(expense.reason.toLocaleLowerCase()) === 0).length < 1) {
        filters.reasons.push(this.capitalize(expense.reason.toLowerCase()));
      }
      let month: number = +expense.date.substr(5, 2);
      if (!filters.months.includes(month)) {
        filters.months.push(month);
      }
      for (let expenseTag of expense.tags) {
        if(filters.tags
          .filter(tag => tag.toLowerCase().indexOf(expenseTag.name.toLocaleLowerCase()) === 0).length < 1) {
          filters.tags.push(this.capitalize(expenseTag.name.toLowerCase()));
        }
      }
    }
    return of(filters);
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
    if (updatedFilters.reasons
      .filter(reason => reason.toLowerCase().indexOf(expense.reason.toLocaleLowerCase()) === 0).length < 1) {
        updatedFilters.reasons.push(this.capitalize(expense.reason.toLowerCase()));
    }
    let month: number = +expense.date.substr(6, 2);
    if (!updatedFilters.months.includes(month)) {
      updatedFilters.months.push(month);
    }
    for (let expenseTag of expense.tags) {
      if(updatedFilters.tags
        .filter(tag => tag.toLowerCase().indexOf(expenseTag.name.toLocaleLowerCase()) === 0).length < 1) {
          updatedFilters.tags.push(this.capitalize(expenseTag.name.toLowerCase()));
      }
    }
    return of(updatedFilters);
  }

  private capitalize(s: string): string {
    if (typeof s !== 'string') return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  private generateExpenseFilter(): ExpenseFilter {
    return null;
  }
}
