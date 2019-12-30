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
        ofType(ExpenseActions.LOAD_EXPENSE_LIST, ExpenseActions.ADD_EXPENSE_SUCCESS),
        mergeMap(() => this.expenseService.loadExpenseListByFilter()
            .pipe(
                map(expenses => (new ExpenseActions.LoadExpenseListSuccess(expenses))),
                catchError(error => of(new ExpenseActions.LoadExpenseListFailure(error)))
            ))
        );

    @Effect()
    addExpense = this.actions$.pipe(
        ofType(ExpenseActions.ADD_EXPENSE),
        mergeMap(() => this.expenseService.addExpense()
            .pipe(
                map(expense => (new ExpenseActions.AddExpenseSuccess())),
                catchError(error => of(new ExpenseActions.AddExpenseFailure(error)))
            ))
    );

    @Effect()
    modifyExpense = this.actions$.pipe(
        ofType(ExpenseActions.MODIFY_EXPENSE),
        mergeMap(() => this.expenseService.modifyExpense()
            .pipe(
                map(expense => (new ExpenseActions.ModifyExpenseSuccess(expense))),
                catchError(error => of(new ExpenseActions.ModifyExpenseFailure(error)))
            ))
    );

    @Effect()
    deleteExpense = this.actions$.pipe(
        ofType(ExpenseActions.DELETE_EXPENSE),
        mergeMap(() => this.expenseService.deleteExpense()
            .pipe(
                map(expense => (new ExpenseActions.DeleteExpenseSuccess())),
                catchError(error => of(new ExpenseActions.DeleteExpenseFailure(error)))
            ))
    );

    @Effect()
    filterExpenseList = this.actions$.pipe(
        ofType(ExpenseActions.CHANGE_REASONS_FILTER, ExpenseActions.CHANGE_MONTH_FILTER, ExpenseActions.CHANGE_TAGS_FILTER),
        mergeMap(() => this.expenseService.loadExpenseListByFilter()
            .pipe(
                map(expenses => (new ExpenseActions.FilterChangesApplied(expenses))),
                catchError(error => of(new ExpenseActions.ApplyFilterChangesFailed(error)))
            ))
    )

    constructor(private actions$: Actions,
                private expenseService: ExpenseService) {}
}