import { Action } from '@ngrx/store';
import { Expense } from '../../expense';

export const LOAD_EXPENSE_LIST = '[ExpenseTracker] Load expense list';
export const LOAD_EXPENSE_LIST_SUCCESS = '[ExpenseTracker] Loading expense list was successful';
export const LOAD_EXPENSE_LIST_FAILURE = '[ExpenseTracker] Loading expense list failed';
export const START_ADD_EXPENSE = '[ExpenseTracker] Start adding new expense';
export const RESET_ADD_FORM = '[ExpenseTracker] Reset form in add mode';
export const ADD_EXPENSE_CANCELED = '[ExpenseTracker] Add expense was canceled';
export const ADD_EXPENSE = '[ExpenseTracker] Add expense';
export const ADD_EXPENSE_SUCCESS = '[ExpenseTracker] Add new expense was successful';
export const ADD_EXPENSE_FAILURE = '[ExpenseTracker] Add new expense failed';
export const START_MODIFY_EXPENSE = '[ExpenseTracker] Start modifying expense';
export const RESET_MODIFY_FORM = '[ExpenseTracker] Reset form in modify mode';
export const MODIFY_EXPENSE_CANCELED = '[ExpenseTracker] Modify expense was canceled';
export const MODIFY_EXPENSE = '[ExpenseTracker] Modify expense';
export const MODIFY_EXPENSE_SUCCESS = '[ExpenseTracker] Modify expense was successful';
export const MODIFY_EXPENSE_FAILURE = '[ExpenseTracker] Modify expense failed';
export const START_DELETE_EXPENSE = '[ExpenseTracker] Start deleting expense';
export const DELETE_EXPENSE_CANCELED = '[ExpenseTracker] Delete expense was canceled';
export const DELETE_EXPENSE = '[ExpenseTracker] Delete expense';
export const DELETE_EXPENSE_SUCCESS = '[ExpenseTracker] Delete expense was successful';
export const DELETE_EXPENSE_FAILURE = '[ExpenseTracker] Delete expense failed';
export const GENERATE_USER_FEEDBACK = '[ExpenseTracker] User feedback was generated';

export class LoadExpenseList implements Action {
    readonly type = LOAD_EXPENSE_LIST;
}

export class LoadExpenseListSuccess implements Action {
    readonly type = LOAD_EXPENSE_LIST_SUCCESS;

    constructor(public payload: Expense[]) {}
}

export class LoadExpenseListFailure implements Action {
    readonly type = LOAD_EXPENSE_LIST_FAILURE;

    constructor(public payload: string) {}
}

export class StartAddExpense implements Action {
    readonly type = START_ADD_EXPENSE;
}

export class ResetAddForm implements Action {
    readonly type = RESET_ADD_FORM;
}

export class AddExpenseCanceled implements Action {
    readonly type = ADD_EXPENSE_CANCELED;
}

export class AddExpense implements Action {
    readonly type = ADD_EXPENSE;

    constructor(public payload: Expense) {}
}

export class AddExpenseSuccess implements Action {
    readonly type = ADD_EXPENSE_SUCCESS;

    constructor(public payload: Expense) {}
}

export class AddExpenseFailure implements Action {
    readonly type = ADD_EXPENSE_FAILURE;

    constructor(public payload: string) {}
}

export class StartModifyExpense implements Action {
    readonly type = START_MODIFY_EXPENSE;
   
    constructor(public payload: number) {}
}

export class ResetModifyForm implements Action {
    readonly type = RESET_MODIFY_FORM;
}

export class ModifyExpenseCanceled implements Action {
    readonly type = MODIFY_EXPENSE_CANCELED;
}

export class ModifyExpense implements Action {
    readonly type = MODIFY_EXPENSE;
   
    constructor(public payload: Expense) {}
}

export class ModifyExpenseSuccess implements Action {
    readonly type = MODIFY_EXPENSE_SUCCESS;

    constructor(public payload: Expense) {}
}

export class ModifyExpenseFailure implements Action {
    readonly type = MODIFY_EXPENSE_FAILURE;

    constructor(public payload: string) {}
}

export class StartDeleteExpense implements Action {
    readonly type = START_DELETE_EXPENSE;
   
    constructor(public payload: number) {}
}

export class DeleteExpenseCanceled implements Action {
    readonly type = DELETE_EXPENSE_CANCELED;
}

export class DeleteExpense implements Action {
    readonly type = DELETE_EXPENSE;
}

export class DeleteExpenseSuccess implements Action {
    readonly type = DELETE_EXPENSE_SUCCESS;
}

export class DeleteExpenseFailure implements Action {
    readonly type = DELETE_EXPENSE_FAILURE;

    constructor(public payload: string) {}
}

export class GenerateUserFeedback implements Action {
    readonly type = GENERATE_USER_FEEDBACK;
}

export type Actions = LoadExpenseList
                    | LoadExpenseListSuccess
                    | LoadExpenseListFailure
                    | StartAddExpense
                    | ResetAddForm
                    | AddExpenseCanceled
                    | AddExpense
                    | AddExpenseSuccess
                    | AddExpenseFailure
                    | StartModifyExpense
                    | ResetModifyForm
                    | ModifyExpenseCanceled
                    | ModifyExpense
                    | ModifyExpenseSuccess
                    | ModifyExpenseFailure
                    | StartDeleteExpense
                    | DeleteExpenseCanceled
                    | DeleteExpense
                    | DeleteExpenseSuccess
                    | DeleteExpenseFailure
                    | GenerateUserFeedback;