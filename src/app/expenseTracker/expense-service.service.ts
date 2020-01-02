import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as ExpenseFilterActions from './expenseOverview/expenses-filter/stateManagement/expense-filter.action'
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
        .filter(reason => reason.toLowerCase().indexOf(expense.reason.toLowerCase()) === 0).length < 1) {
        filters.reasons.push(this.capitalize(expense.reason.toLowerCase()));
      }
      let month: number = +expense.date.substr(5, 2);
      if (!filters.months.includes(month)) {
        filters.months.push(month);
      }
      for (let expenseTag of expense.tags) {
        if(filters.tags
          .filter(tag => tag.toLowerCase().indexOf(expenseTag.toLowerCase()) === 0).length < 1) {
          filters.tags.push(this.capitalize(expenseTag.toLowerCase()));
        }
      }
    }
    return of(filters);
  }
  
  updatefilteredTagsDueToTagClick(tagName: string) {
    let updatedFilteredTags: string[] = this.getFilteredTags();
    if (updatedFilteredTags
      .filter(tag => tag.toLowerCase().indexOf(tagName.toLowerCase()) === 0).length < 1) {
      updatedFilteredTags.push(this.capitalize(tagName.toLowerCase()));
    } else {
      updatedFilteredTags.splice(updatedFilteredTags.indexOf(this.capitalize(tagName.toLowerCase())), 1);
    }
    this.store.dispatch(new ExpenseFilterActions.ChangeTagsFilter(updatedFilteredTags));
  }

  private getFilteredTags() : string[] {
    let updatedFilteredTags: string[];
    this.store.select('expenseFilter')
      .subscribe(expenseFilterState => updatedFilteredTags = [...expenseFilterState.filteredTags]);
    return updatedFilteredTags;
  }
  
  updateUtilizedValuesDueToExpensesChange(expense: Expense): Observable<ExpenseFilter> {
    let updatedUtilizedValues: ExpenseFilter = this.getUtilizedValues();
    this.updateUtilizedReasons(updatedUtilizedValues, expense.reason);
    this.updateUtilizedMonths(updatedUtilizedValues, expense.date);
    this.updateUtilizedTags(updatedUtilizedValues, expense.tags);
    return of(updatedUtilizedValues);
  }

  private getUtilizedValues() {
    let updatedUtilizedValues: ExpenseFilter;
    this.store.select('expenseFilter')
      .subscribe(expenseFilterState => updatedUtilizedValues = {
        reasons: [...expenseFilterState.utilizedReasons],
        months: [...expenseFilterState.utilizedMonths],
        tags: [...expenseFilterState.utilizedTags],
      });
    return updatedUtilizedValues;
  }
  
  private updateUtilizedReasons(updatedUtilizedValues: ExpenseFilter, reason: string) {
    if (updatedUtilizedValues.reasons
      .filter(reason => reason.toLowerCase().indexOf(reason.toLowerCase()) === 0).length < 1) {
      updatedUtilizedValues.reasons.push(this.capitalize(reason.toLowerCase()));
    }
  }
  
  private updateUtilizedMonths(updatedUtilizedValues: ExpenseFilter, date: string) {
    let month: number = +date.substr(6, 2);
    if (!updatedUtilizedValues.months.includes(month)) {
      updatedUtilizedValues.months.push(month);
    }
  }
  
  private updateUtilizedTags(updatedUtilizedValues: ExpenseFilter, tags: string[]) {
    for (let expenseTag of tags) {
      if (updatedUtilizedValues.tags
        .filter(tag => tag.toLowerCase().indexOf(expenseTag.toLowerCase()) === 0).length < 1) {
        updatedUtilizedValues.tags.push(this.capitalize(expenseTag.toLowerCase()));
      }
    }
  }

  private capitalize(s: string): string {
    let capitalizedAfterSpace: string = this.capitalizeSubstrings(s, " ");
    return this.capitalizeSubstrings(capitalizedAfterSpace, "-");
  }

  private capitalizeSubstrings(s: string, separator: string): string {
    let words: string[] = s.split(separator);
    let capitalizedString: string = "";
    for (let word of words) {
      capitalizedString = capitalizedString + word.charAt(0).toUpperCase() + word.slice(1) + separator;
    }
    return capitalizedString.slice(0, s.length);
  }

  private generateExpenseFilter(): ExpenseFilter {
    return null;
  }
}
