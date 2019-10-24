import { Action } from '@ngrx/store';
import { Expense } from '../../expense';
import { expenseReducer, ExpenseState } from './expense.reducer';

export const INITIALIZE_EXPENSE = '[ExpenseTracker] Initialize expenses list';
export const ADD_EXPENSE = '[ExpenseTracker] Add expense';
export const START_MODIFY_EXPENSE = '[ExpenseTracker] Start modifying expense';
export const MODIFY_EXPENSE = '[ExpenseTracker] Modify expense';
export const STOP_MODIFY_EXPENSE = '[ExpenseTracker] Stop modifying expense';
export const DELETE_EXPENSE = '[ExpenseTracker] Delete expense';

export class InitializeExpense implements Action {
    readonly type = INITIALIZE_EXPENSE;

    constructor(public payload: ExpenseState) {}
}

export class AddExpense implements Action {
    readonly type = ADD_EXPENSE;

    constructor(public payload: {month: number, expense: Expense}) {}
}

export class StartModifyExpense implements Action {
    readonly type = START_MODIFY_EXPENSE;
   
    constructor(public payload: number) {}
}

export class ModifyExpense implements Action {
    readonly type = MODIFY_EXPENSE;
   
    constructor(public payload: Expense) {}
}

export class StopModifyExpense implements Action {
    readonly type = STOP_MODIFY_EXPENSE;
}

export class DeleteExpense implements Action {
    readonly type = DELETE_EXPENSE;
}

export type Actions = InitializeExpense
                    | AddExpense
                    | StartModifyExpense
                    | ModifyExpense
                    | StopModifyExpense
                    | DeleteExpense;