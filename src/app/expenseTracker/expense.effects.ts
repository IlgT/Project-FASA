import { Actions, ofType, Effect, createEffect } from '@ngrx/effects';
import { ExpenseService } from './services/expense-service.service';
import { mergeMap, map, catchError, exhaustMap, tap, switchMap, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { ExpenseActions } from './action-types';
import { Expense } from './model/Expense';
import { ExpenseFilterActions } from './expenseOverview/expenses-filter/stateManagement/action-types';

@Injectable()
export class ExpenseEffects {
    
    loadExpenseList$ = createEffect(() => 
        this.actions$.pipe(
            ofType(ExpenseActions.loadExpenseList, ExpenseActions.addExpenseSuccess,
                ExpenseActions.modifyExpenseSuccess),
            mergeMap(() => this.expenseService.loadExpenseListByFilter()),
            map(expenses => ExpenseActions.loadExpenseListSuccess({expenses: expenses})),
            catchError(error => of(ExpenseActions.loadExpenseListFailure({error: error.message})))
        ), { resubscribeOnError: false }
    );

    addExpense$ = createEffect(() => 
        this.actions$.pipe(
            ofType(ExpenseActions.addExpense),
            mergeMap(() => this.expenseService.addExpense()),
            map(expense => ExpenseActions.addExpenseSuccess({expense: expense})),
            catchError(error => of(ExpenseActions.addExpenseFailure({error: error.message})))
        ), { resubscribeOnError: false }
    );

    modifyExpense$ = createEffect(() => 
        this.actions$.pipe(
            ofType(ExpenseActions.removeExpenseToBeModified,
                    ExpenseActions.ModifyExpense),
            concatMap(() => this.expenseService.modifyExpense()),
            map(expense => ExpenseActions.modifyExpenseSuccess({expense: expense})),
            catchError(error => of(ExpenseActions.modifyExpenseFailure({error: error.message})))
        ), { resubscribeOnError: false }
    );

    deleteExpense$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ExpenseActions.deleteExpense),
            mergeMap(() => this.expenseService.deleteExpense()),
            map(expense => ExpenseActions.deleteExpenseSuccess),
            catchError(error => of(ExpenseActions.deleteExpenseFailure({error: error.message})))
        ), { resubscribeOnError: false }
    );

    filterExpenseList$ = createEffect(() =>
        this.actions$.pipe(
            ofType( ExpenseFilterActions.changeReasonsFilter,
                ExpenseFilterActions.changeMonthFilter,
                ExpenseFilterActions.changeTagsFilter),
            mergeMap(() => this.expenseService.loadExpenseListByFilter()),
            map(expenses => ExpenseActions.loadExpenseListSuccess({expenses: expenses})),
            catchError(error => of(ExpenseActions.loadExpenseListFailure({error: error.message})))
        ), { resubscribeOnError: false }
    );

    loadUtiliziedValues$ = createEffect(() => 
        this.actions$.pipe(
            ofType( ExpenseFilterActions.loadUtilizedValues),
            mergeMap(() => this.expenseService.loadUtilizedValuesForFilter()),
            map(expenseFilters => ExpenseFilterActions.loadUtilizedValuesSuccess({utilizedFilter: expenseFilters})),
            catchError(error => of(ExpenseFilterActions.loadUtilizedValuesFailure({error: error.message})))
        ), { resubscribeOnError: false }
    );

    updateFilters$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ExpenseActions.addExpenseSuccess, ExpenseActions.modifyExpenseSuccess),
            mergeMap((action: {expense: Expense}) =>
                this.expenseService.updateUtilizedValuesDueToExpensesChange(action.expense)),
            map(filters => ExpenseFilterActions.updateFilterSuccess({utilizedFilter: filters})),
            catchError(error => of(ExpenseFilterActions.updateFilterFailure({error: error.message})))
        ), { resubscribeOnError: false }
    );

    generateNegativeUserFeedback$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ExpenseActions.loadExpenseListFailure, ExpenseFilterActions.loadUtilizedValuesFailure,
                ExpenseActions.addExpenseFailure, ExpenseActions.modifyExpenseFailure, ExpenseActions.deleteExpenseFailure),
            tap((action: {type: string, error: string}) => this.expenseService.generateUserFeedback(action))
        ), { dispatch: false }
    );

    generatePositiveUserFeedback$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ExpenseActions.addExpenseSuccess, ExpenseActions.modifyExpenseSuccess, ExpenseActions.deleteExpenseSuccess),
            tap((action: {type: string}) => this.expenseService.generateUserFeedback({type: action.type, error: null}))
        ), { dispatch: false }
    );

    constructor(private actions$: Actions,
                private expenseService: ExpenseService) {}
}