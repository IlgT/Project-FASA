import { Action } from '@ngrx/store';
import { Expense } from '../../expense';

export const INITIALIZE_EXPENSE = '[ExpenseTracker] Initialize expense list';
export const INITIALIZE_EXPENSE_SUCCESS = '[ExpenseTracker] Initialize expenses list was successful';
export const INITIALIZE_EXPENSE_FAILURE = '[ExpenseTracker] Initialize expense list failed';
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
export const CHANGE_REASONS_FILTER = '[ExpenseTracker] Reasons filter was changed';
export const CHANGE_MONTH_FILTER = '[ExpenseTracker] Month filter was changed';
export const CHANGE_TAGS_FILTER = '[ExpenseTracker] Tags filter was changed';
export const FILTER_CHANGES_APPLIED = '[ExpenseTracker] Filter changes were applied';

export class InitializeExpense implements Action {
    readonly type = INITIALIZE_EXPENSE;
}

export class InitializeExpenseSuccess implements Action {
    readonly type = INITIALIZE_EXPENSE_SUCCESS;
}

export class InitializeExpenseFailure implements Action {
    readonly type = INITIALIZE_EXPENSE_FAILURE;

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

export class ChangeReasonsFilter implements Action {
    readonly type = CHANGE_REASONS_FILTER;
    
    constructor(public payload: string[]) {}
}

export class ChangeMonthFilter implements Action {
    readonly type = CHANGE_MONTH_FILTER;
    
    constructor(public payload: number) {}
}

export class ChangeTagsFilter implements Action {
    readonly type = CHANGE_TAGS_FILTER;
    
    constructor(public payload: string[]) {}
}

export class FilterChangesApplied implements Action {
    readonly type = FILTER_CHANGES_APPLIED;
}


export type Actions = InitializeExpense
                    | InitializeExpenseSuccess
                    | InitializeExpenseFailure
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
                    | ChangeReasonsFilter
                    | ChangeMonthFilter
                    | ChangeTagsFilter
                    | FilterChangesApplied;