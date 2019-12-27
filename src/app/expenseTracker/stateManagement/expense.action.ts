import { Action } from '@ngrx/store';
import { Expense } from '../../expense';
import { expenseReducer, ExpenseState } from './expense.reducer';

export const INITIALIZE_EXPENSE = '[ExpenseTracker] Initialize expense list';
export const INITIALIZE_EXPENSE_SUCCESS = '[ExpenseTracker] Initialize expenses list was successful';
export const INITIALIZE_EXPENSE_FAILURE = '[ExpenseTracker] Initialize expense list failed';
export const START_ADD_EXPENSE = '[ExpenseTracker] Start adding new expense';
export const ADD_EXPENSE = '[ExpenseTracker] Add expense';
export const ADD_EXPENSE_SUCCESS = '[ExpenseTracker] Add new expense was successful';
export const ADD_EXPENSE_FAILURE = '[ExpenseTracker] Add new expense failed';
export const START_MODIFY_EXPENSE = '[ExpenseTracker] Start modifying expense';
export const MODIFY_EXPENSE = '[ExpenseTracker] Modify expense';
export const MODIFY_EXPENSE_SUCCESS = '[ExpenseTracker] Modify expense was successful';
export const MODIFY_EXPENSE_FAILURE = '[ExpenseTracker] Modify expense failed';
export const MODIFY_EXPENSE_CANCELED = '[ExpenseTracker] Modify expense was cancled';
export const START_DELETE_EXPENSE = '[ExpenseTracker] Start deleting expense';
export const DELETE_EXPENSE = '[ExpenseTracker] Delete expense';
export const DELETE_EXPENSE_SUCCESS = '[ExpenseTracker] Delete expense was successful';
export const DELETE_EXPENSE_FAILURE = '[ExpenseTracker] Delete expense failed';

export class InitializeExpense implements Action {
    readonly type = INITIALIZE_EXPENSE;
}

export class InitializeExpenseSuccess implements Action {
    readonly type = INITIALIZE_EXPENSE_SUCCESS;

    constructor(public payload: ExpenseState) {}
}

export class InitializeExpenseFailure implements Action {
    readonly type = INITIALIZE_EXPENSE_FAILURE;

    constructor(public payload: String) {}
}

export class StartAddExpense implements Action {
    readonly type = START_ADD_EXPENSE;
}

export class AddExpense implements Action {
    readonly type = ADD_EXPENSE;

    constructor(public payload: Expense) {}
}

export class AddExpenseSuccess implements Action {
    readonly type = ADD_EXPENSE_SUCCESS;
}

export class AddExpenseFailure implements Action {
    readonly type = ADD_EXPENSE_FAILURE;

    constructor(public payload: String) {}
}

export class StartModifyExpense implements Action {
    readonly type = START_MODIFY_EXPENSE;
   
    constructor(public payload: number) {}
}

export class ModifyExpense implements Action {
    readonly type = MODIFY_EXPENSE;
   
    constructor(public payload: Expense) {}
}

export class ModifyExpenseSuccess implements Action {
    readonly type = MODIFY_EXPENSE_SUCCESS;
}

export class ModifyExpenseFailure implements Action {
    readonly type = MODIFY_EXPENSE_FAILURE;

    constructor(public payload: String) {}
}

export class ModifyExpenseCanceled implements Action {
    readonly type = MODIFY_EXPENSE_CANCELED;
}

export class StartDeleteExpense implements Action {
    readonly type = START_DELETE_EXPENSE;
   
    constructor(public payload: number) {}
}

export class DeleteExpense implements Action {
    readonly type = DELETE_EXPENSE;
}

export class DeleteExpenseSuccess implements Action {
    readonly type = DELETE_EXPENSE_SUCCESS;
}

export class DeleteExpenseFailure implements Action {
    readonly type = DELETE_EXPENSE_FAILURE;

    constructor(public payload: String) {}
}

export type Actions = InitializeExpense
                    | InitializeExpenseSuccess
                    | InitializeExpenseFailure
                    | StartAddExpense
                    | AddExpense
                    | AddExpenseSuccess
                    | AddExpenseFailure
                    | StartModifyExpense
                    | ModifyExpense
                    | ModifyExpenseSuccess
                    | ModifyExpenseFailure
                    | ModifyExpenseCanceled
                    | StartDeleteExpense
                    | DeleteExpense
                    | DeleteExpenseSuccess
                    | DeleteExpenseFailure;