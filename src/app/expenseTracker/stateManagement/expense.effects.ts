import { Actions, ofType, Effect } from '@ngrx/effects';
import * as ExpenseActions from './expense.action';
import * as ExpenseFilterActions from '../expenseOverview/expenses-filter/stateManagement/expense-filter.action'
import { ExpenseService } from '../expense-service.service';
import { mergeMap, map, catchError, exhaustMap } from 'rxjs/operators';
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
                catchError(error => of(new ExpenseActions.LoadExpenseListFailure(error.message)))
            ))
        );

    @Effect()
    addExpense = this.actions$.pipe(
        ofType(ExpenseActions.ADD_EXPENSE),
        mergeMap(() => this.expenseService.addExpense()
            .pipe(
                map(expense => (new ExpenseActions.AddExpenseSuccess(expense))),
                catchError(error => of(new ExpenseActions.AddExpenseFailure(error.message)))
            ))
    );

    @Effect()
    modifyExpense = this.actions$.pipe(
        ofType(ExpenseActions.MODIFY_EXPENSE),
        mergeMap(() => this.expenseService.modifyExpense()
            .pipe(
                map(expense => (new ExpenseActions.ModifyExpenseSuccess(expense))),
                catchError(error => of(new ExpenseActions.ModifyExpenseFailure(error.message)))
            ))
    );

    @Effect()
    deleteExpense = this.actions$.pipe(
        ofType(ExpenseActions.DELETE_EXPENSE),
        mergeMap(() => this.expenseService.deleteExpense()
            .pipe(
                map(expense => (new ExpenseActions.DeleteExpenseSuccess())),
                catchError(error => of(new ExpenseActions.DeleteExpenseFailure(error.message)))
            ))
    );

    @Effect()
    filterExpenseList = this.actions$.pipe(
        ofType( ExpenseFilterActions.CHANGE_REASONS_FILTER,
                ExpenseFilterActions.CHANGE_MONTH_FILTER,
                ExpenseFilterActions.CHANGE_TAGS_FILTER),
        mergeMap(() => this.expenseService.loadExpenseListByFilter()
            .pipe(
                map(expenses => (new ExpenseActions.LoadExpenseListSuccess(expenses))),
                catchError(error => of(new ExpenseActions.LoadExpenseListFailure(error.message)))
            ))
    )

    @Effect()
    loadUtiliziedValues = this.actions$.pipe(
        ofType( ExpenseFilterActions.LOAD_UTILIZED_VALUES),
        mergeMap(() => this.expenseService.loadUtilizedValuesForFilter()
            .pipe(
                map(expenseFilters => (new ExpenseFilterActions.LoadUtilizedValuesSuccess(expenseFilters))),
                catchError(error => of(new ExpenseFilterActions.LoadUtilizedValuesFailure(error.message)))
            ))
    );

    @Effect()
    updateFilters = this.actions$.pipe(
        ofType(ExpenseActions.ADD_EXPENSE_SUCCESS, ExpenseActions.MODIFY_EXPENSE_SUCCESS),
        mergeMap((action: ExpenseActions.AddExpenseSuccess | ExpenseActions.ModifyExpenseSuccess) =>
            this.expenseService.updateUtilizedValuesDueToExpensesChange(action.payload)
            .pipe( 
                map(filters => (new ExpenseFilterActions.UpdateFiltersSuccess(filters))),
                catchError(error => of(new ExpenseFilterActions.UpdateFiltersFailure(error.message)))
            ))
    );

    @Effect()
    generateUserFeedback = this.actions$.pipe(
        ofType(ExpenseActions.LOAD_EXPENSE_LIST_FAILURE, ExpenseFilterActions.LOAD_UTILIZED_VALUES_FAILURE,
            ExpenseActions.ADD_EXPENSE_SUCCESS, ExpenseActions.MODIFY_EXPENSE_SUCCESS, ExpenseActions.DELETE_EXPENSE_SUCCESS,
            ExpenseActions.ADD_EXPENSE_FAILURE, ExpenseActions.MODIFY_EXPENSE_FAILURE, ExpenseActions.DELETE_EXPENSE_FAILURE),
        mergeMap((action: {type: string, payload: string}) => this.expenseService.generateUserFeedback(action)
            .pipe(
                map(() => (new ExpenseActions.GenerateUserFeedback())) 
            ))
    );

    constructor(private actions$: Actions,
                private expenseService: ExpenseService) {}
}