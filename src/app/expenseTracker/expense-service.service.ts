import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as ExpenseActions  from '../expenseTracker/stateManagement/expense.action';
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
 
  getExpenseListByFilter(): Observable<Expense[]> {
    const filter: ExpenseFilter = this.generateExpenseFilter();
    //HTTP-Call
    return of(EXPENSES);
  }

  private generateExpenseFilter(): ExpenseFilter {
    return null;
  }
}