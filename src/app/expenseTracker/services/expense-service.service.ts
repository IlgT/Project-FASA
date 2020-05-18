import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AppState } from 'src/app/reducers/app.reducers';
import { ExpenseActions } from '../action-types';
import * as ExpenseFilterActions from '../expenseOverview/expenses-filter/stateManagement/expense-filter.actions';
import { getFilteredMonth, getFilteredReasons, getFilteredTags } from '../expenseOverview/expenses-filter/stateManagement/expense-filter.selectors';
import { Expense } from '../model/Expense';
import { FilterSearch } from '../model/FilterSearch';
import { UtilizedFilter } from '../model/UtilizedFilter';
import { ExpenseHttpService } from './expense-http.service';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  constructor(private store: Store<AppState>,
              private httpService: ExpenseHttpService,
              private _snackBar: MatSnackBar) { }

  loadExpenseListByFilter(): Observable<Expense[]> {
    return this.httpService.loadExpenseListByFilter(this.generateExpenseFilter());
  }

  addExpense(): Observable<Expense> {
    return this.httpService.addExpense(this.getActualExpense());
  }

  modifyExpense(): Observable<Expense> {
    return this.httpService.modifyExpense(this.getActualExpense());
  }

  deleteExpense(): Observable<any> {
    this.httpService.deleteExpense(this.getActualExpenseId());
    return of(null);
  }

  loadUtilizedValuesForFilter(): Observable<UtilizedFilter> {
    return this.httpService.loadUtilizedValuesForFilter();
  }

  getDefaultCurrency(): Observable<string> {
    return this.httpService.getDefaultCurrency();
  }
 
  isMatchingFilters(expense: Expense) : boolean {
    var isMatching = true;
    this.store.pipe(select(getFilteredMonth))
      .pipe(tap(filteredMonth => {
        if(filteredMonth !== +expense.date.substring(5, 7))
          isMatching = isMatching && false;
      })).subscribe().unsubscribe();
    this.store.pipe(select(getFilteredReasons))
      .pipe(tap(reasons => {
        if(reasons.length !== 0
          && !reasons.includes(this.capitalize(expense.reason.toLowerCase())))
          isMatching = isMatching && false;
      })).subscribe().unsubscribe();
    this.store.pipe(select(getFilteredTags))
        .pipe(tap(tags => {
          if(tags.length !== 0
            && tags.filter(tag => expense.tags.includes(tag)).length === 0)
            isMatching = isMatching && false;
        })).subscribe().unsubscribe();
    return isMatching;
  }

  updatefilteredTagsDueToTagClick(tagName: string) {
    let updatedFilteredTags: string[] = this.getFilteredTags();
    if (updatedFilteredTags
      .filter(tag => tag.toLowerCase().indexOf(tagName.toLowerCase()) === 0).length < 1) {
      updatedFilteredTags.push(this.capitalize(tagName.toLowerCase()));
    } else {
      updatedFilteredTags.splice(updatedFilteredTags.indexOf(this.capitalize(tagName.toLowerCase())), 1);
    }
    this.store.dispatch(ExpenseFilterActions.changeTagsFilter({tags: updatedFilteredTags}));
  }
  
  updateUtilizedValuesDueToExpensesChange(expense: Expense): Observable<UtilizedFilter> {
    let updatedUtilizedValues: UtilizedFilter = this.getUtilizedValues();
    this.updateUtilizedReasons(updatedUtilizedValues, expense.reason);
    this.updateUtilizedMonths(updatedUtilizedValues, expense.date);
    this.updateUtilizedTags(updatedUtilizedValues, expense.tags);
    return of(updatedUtilizedValues);
  }

  generateUserFeedback(action:  {type: string, error: string}) : Observable<MatSnackBarRef<SimpleSnackBar>> {
    let userFeedback: string;
    let style: string;
    switch(action.type) {
      case ExpenseActions.loadExpenseListFailure.type:
        userFeedback = "Ausgaben konnten nicht geladen werden.";
        style = "error-snackbar";
        break;
      case ExpenseFilterActions.loadUtilizedValuesFailure.type:
        userFeedback = "Filter konnten nicht geladen werden.";
        style = "error-snackbar";
        break;
      case ExpenseActions.addExpenseSuccess.type:
        userFeedback = "Ausgabe wurde hinzugefügt.";
        style = "success-snackbar";
        break;
      case ExpenseActions.addExpenseFailure.type:
        userFeedback = "Ausgabe konnte nicht hinzugefügt werden.";
        style = "error-snackbar";
        console.error(action.error);
        break;
      case ExpenseActions.modifyExpenseSuccess.type:
        userFeedback = "Ausgabe wurde überarbeitet.";
        style = "success-snackbar";
        break;
      case ExpenseActions.modifyExpenseFailure.type:
        userFeedback = "Ausgabe konnte nicht überarbeitet werden.";
        style = "error-snackbar";
        console.error(action.error);
        break;
      case ExpenseActions.deleteExpenseSuccess.type:
        userFeedback = "Ausgabe wurde gelöscht.";
        style = "success-snackbar";
        break;
      case ExpenseActions.deleteExpenseFailure.type:
        userFeedback = "Ausgabe konnte nicht gelöscht werden.";
        style = "error-snackbar";
        console.error(action.error);
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
    if (!updatedUtilizedValues.reasons.includes(reason.toLowerCase())) {
      updatedUtilizedValues.reasons.push(this.capitalize(reason.toLowerCase()));
    }
  }
  
  private updateUtilizedMonths(updatedUtilizedValues: UtilizedFilter, date: string) {
    console.log(date);
    let month: number = +date.substr(5, 2);
    console.log(month);
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
    let usedFilters: FilterSearch;
    this.store.select('expenseFilter')
      .subscribe(expenseFilterState => usedFilters = {
        reasons: [...expenseFilterState.filteredReasons],
        month: expenseFilterState.filteredMonth,
        tags: [...expenseFilterState.filteredTags],
      }).unsubscribe();
    return usedFilters;
  }

  private getActualExpense(): Expense {
    let expense: Expense;
    this.store.select('expense')
      .subscribe(expenseState => expense = expenseState.actualExpense)
      .unsubscribe();
    return expense;
  }

  private getActualExpenseId(): number {
    let id: number;
    this.store.select('expense')
      .subscribe(expenseState => id = expenseState.actualExpenseId)
      .unsubscribe();
    return id;
  }
}
