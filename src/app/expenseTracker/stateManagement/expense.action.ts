import { Action } from '@ngrx/store';
import { Expense } from '../../expense';
import { expenseReducer, ExpenseState } from './expense.reducer';

export const INITIALIZE_EXPENSE = '[ExpenseTracker] Initialize expenses list';
export const START_ADD_EXPENSE = '[ExpenseTracker] Start adding new expense';
export const ADD_EXPENSE = '[ExpenseTracker] Add expense';
export const STOP_ADD_EXPENSE = '[ExpenseTracker] Stop adding new expense';
export const START_MODIFY_EXPENSE = '[ExpenseTracker] Start modifying expense';
export const MODIFY_EXPENSE = '[ExpenseTracker] Modify expense';
export const STOP_MODIFY_EXPENSE = '[ExpenseTracker] Stop modifying expense';
export const START_DELETE_EXPENSE = '[ExpenseTracker] Start deleting expense';
export const DELETE_EXPENSE = '[ExpenseTracker] Delete expense';
export const STOP_DELETE_EXPENSE = '[ExpenseTracker] Stop modifying expense';

export class InitializeExpense implements Action {
    readonly type = INITIALIZE_EXPENSE;

    constructor(public payload: ExpenseState) {}
}

export class StartAddExpense implements Action {
    readonly type = START_ADD_EXPENSE;
   
    constructor(public payload: Expense) {}
}

export class AddExpense implements Action {
    readonly type = ADD_EXPENSE;

    constructor(public payload: {month: number, expense: Expense}) {}
}

export class StopAddExpense implements Action {
    readonly type = STOP_ADD_EXPENSE;
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

export class StartDeleteExpense implements Action {
    readonly type = START_DELETE_EXPENSE;
   
    constructor(public payload: number) {}
}

export class DeleteExpense implements Action {
    readonly type = DELETE_EXPENSE;
}

export class StopDeleteExpense implements Action {
    readonly type = STOP_DELETE_EXPENSE;
}

export type Actions = InitializeExpense
                    | StartAddExpense
                    | AddExpense
                    | StopAddExpense
                    | StartModifyExpense
                    | ModifyExpense
                    | StopModifyExpense
                    | StartDeleteExpense
                    | DeleteExpense
                    | StopDeleteExpense;