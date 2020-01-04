import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as ExpenseActions from './stateManagement/expense.action';
import * as ExpenseFilterActions from './expenseOverview/expenses-filter/stateManagement/expense-filter.action';
import * as fromExpense from './stateManagement/expense.reducer';
import * as fromApp from '../stateManagement/app.reducer';
import { Observable, of, Subscribable, Subscription } from 'rxjs';
import { Expense } from '../expense';
import { EXPENSES } from '../expense.testdata';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material';
import { map } from 'rxjs/operators';
import { FilterSearch } from './FilterSearch';
import { UtilizedFilter } from './UtilizedFilter';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  constructor(private store: Store<fromApp.AppState>,
              private _snackBar: MatSnackBar) { }
 
  loadExpenseListByFilter(): Observable<Expense[]> {
    const filter: FilterSearch = this.generateExpenseFilter();
    console.log("HTTP-CALL for loading all expense by filter");
    return of(EXPENSES);
  }

  addExpense(): Observable<Expense> {
    console.log("HTTP-CALL for adding a expense");
    return of(null).pipe(map(() => {throw new Error("404 - Service not found")}));
  }

  modifyExpense(): Observable<Expense> {
    console.log("HTTP-CALL for modifying a expense");
    let expense: Expense;
    this.store.select('expense').subscribe(
      (expenseState: fromExpense.ExpenseState) => {
        expense = expenseState.actualExpense;
      }).unsubscribe();
    return of(expense);
  }

  deleteExpense(): Observable<Expense> {
    let expense: Expense;
    this.store.select('expense').subscribe(
    (expenseState: fromExpense.ExpenseState) => {
      expense = expenseState.actualExpense;
    }).unsubscribe();
    console.log("HTTP-CALL for deleting a expense");
    return of(null);
  }

  loadUtilizedValuesForFilter(): Observable<UtilizedFilter> {
    console.log("HTTP-CALL for loading all utilized reasons, months and tags for filter dropdowns");
    let filters: UtilizedFilter = {
      reasons: [],
      months: [],
      tags: [],
      currencies: ["EUR", "USD"]
    }

    let expenses: Expense[];
    this.store.select('expense')
      .subscribe(expenseState => expenses = expenseState.expenses).unsubscribe();

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
    filters.reasons.sort();
    filters.months.sort((a, b) => a - b);
    filters.tags.sort();
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
  
  updateUtilizedValuesDueToExpensesChange(expense: Expense): Observable<UtilizedFilter> {
    let updatedUtilizedValues: UtilizedFilter = this.getUtilizedValues();
    this.updateUtilizedReasons(updatedUtilizedValues, expense.reason);
    this.updateUtilizedMonths(updatedUtilizedValues, expense.date);
    this.updateUtilizedTags(updatedUtilizedValues, expense.tags);
    return of(updatedUtilizedValues);
  }

  generateUserFeedback(action:  {type: string, payload: string}) : Observable<MatSnackBarRef<SimpleSnackBar>> {
    let userFeedback: string;
    let style: string;
    switch(action.type) {
      case ExpenseActions.LOAD_EXPENSE_LIST_FAILURE:
        userFeedback = "Ausgaben konnten nicht geladen werden.";
        style = "error-snackbar";
        break;
      case ExpenseFilterActions.LOAD_UTILIZED_VALUES_FAILURE:
        userFeedback = "Filter konnten nicht geladen werden.";
        style = "error-snackbar";
        break;
      case ExpenseActions.ADD_EXPENSE_SUCCESS:
        userFeedback = "Ausgabe wurde hinzugefügt.";
        style = "success-snackbar";
        break;
      case ExpenseActions.ADD_EXPENSE_FAILURE:
        userFeedback = "Ausgabe konnte nicht hinzugefügt werden.";
        style = "error-snackbar";
        console.error(action.payload);
        break;
      case ExpenseActions.MODIFY_EXPENSE_SUCCESS:
        userFeedback = "Ausgabe wurde überarbeitet.";
        style = "success-snackbar";
        break;
      case ExpenseActions.MODIFY_EXPENSE_FAILURE:
        userFeedback = "Ausgabe konnte nicht überarbeitet werden.";
        style = "error-snackbar";
        console.error(action.payload);
        break;
      case ExpenseActions.DELETE_EXPENSE_SUCCESS:
        userFeedback = "Ausgabe wurde gelöscht.";
        style = "success-snackbar";
        break;
      case ExpenseActions.DELETE_EXPENSE_FAILURE:
        userFeedback = "Ausgabe konnte nicht gelöscht werden.";
        style = "error-snackbar";
        console.error(action.payload);
        break;
      default:
        console.error("Not expected action was processed: " + action.type);
        break;
    }
    return of(this._snackBar.open(userFeedback, "", {panelClass: style}));
  }

  private getFilteredTags() : string[] {
    let updatedFilteredTags: string[];
    this.store.select('expenseFilter')
      .subscribe(expenseFilterState => updatedFilteredTags = [...expenseFilterState.filteredTags]).unsubscribe();
    return updatedFilteredTags;
  }

  private getUtilizedValues() {
    let updatedUtilizedValues: UtilizedFilter;
    this.store.select('expenseFilter')
      .subscribe(expenseFilterState => updatedUtilizedValues = {
        reasons: [...expenseFilterState.utilizedReasons],
        months: [...expenseFilterState.utilizedMonths],
        tags: [...expenseFilterState.utilizedTags],
        currencies: [...expenseFilterState.currencies]
      }).unsubscribe();
    return updatedUtilizedValues;
  }
  
  private updateUtilizedReasons(updatedUtilizedValues: UtilizedFilter, reason: string) {
    if (updatedUtilizedValues.reasons
      .filter(reason => reason.toLowerCase().indexOf(reason.toLowerCase()) === 0).length < 1) {
      updatedUtilizedValues.reasons.push(this.capitalize(reason.toLowerCase()));
    }
  }
  
  private updateUtilizedMonths(updatedUtilizedValues: UtilizedFilter, date: string) {
    let month: number = +date.substr(6, 2);
    if (!updatedUtilizedValues.months.includes(month)) {
      updatedUtilizedValues.months.push(month);
    }
  }
  
  private updateUtilizedTags(updatedUtilizedValues: UtilizedFilter, tags: string[]) {
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

  private generateExpenseFilter(): FilterSearch {
    return null;
  }
}
