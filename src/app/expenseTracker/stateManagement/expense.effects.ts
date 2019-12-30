import { Actions, ofType, Effect } from '@ngrx/effects';
import * as ExpenseActions from './expense.action';
import { ExpenseService } from '../expense-service.service';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class ExpenseEffects {
    
    @Effect()
    loadExpenseList = this.actions$.pipe(
        ofType(ExpenseActions.LOAD_EXPENSE_LIST),
        mergeMap(() => this.expenseService.getExpenseListByFilter()
            .pipe(
                map(expenses => (new ExpenseActions.LoadExpenseListSuccess(expenses))),
                catchError(error => of(new ExpenseActions.LoadExpenseListFailure(error)))
            ))
        );

    constructor(private actions$: Actions,
                private expenseService: ExpenseService) {}
}