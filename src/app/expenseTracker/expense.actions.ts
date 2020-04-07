import { createAction, props } from '@ngrx/store';
import { Expense } from './model/Expense';
import { Update } from '@ngrx/entity';

export const loadExpenseList = createAction(
    '[ExpenseTracker] Load expense list'
);

export const loadExpenseListSuccess = createAction(
    '[ExpenseTracker] Loading expense list was successful',
    props<{expenses: Expense[]}>()
);

export const loadExpenseListFailure = createAction(
    '[ExpenseTracker] Loading expense list failed',
    props<{error: string}>()
);

export const openAddForm = createAction(
    '[ExpenseTracker] Open form in add mode'
);

export const resetAddForm = createAction(
    '[ExpenseTracker] Reset form in add mode'
);

export const addExpenseCanceled = createAction(
    '[ExpenseTracker] Add expense was canceled'
);

export const addExpense = createAction(
    '[ExpenseTracker] Add expense',
    props<{expense: Expense}>()
);

export const addExpenseSuccess = createAction(
    '[ExpenseTracker] Add new expense was successful',
    props<{expense: Expense}>()
);

export const addExpenseFailure = createAction(
    '[ExpenseTracker] Add new expense failed',
    props<{error: string}>()
);

export const openModifyForm = createAction(
    '[ExpenseTracker] Open form in modify mode',
    props<{id: number}>()
);

export const resetModifyForm = createAction(
    '[ExpenseTracker] Reset form in modify mode'
);

export const modifyExpenseCanceled = createAction(
    '[ExpenseTracker] Modify expense was canceled'
);

export const pesimisticModifyExpense = createAction(
    '[ExpenseTracker] Pesimistic Modify expense',
    props<{expense: Expense}>()
);

export const optimisticModifyExpense = createAction(
    '[ExpenseTracker] Optimistic Modify expense',
    props<{expense: Update<Expense>}>()
);

export const modifyExpenseSuccess = createAction(
    '[ExpenseTracker] Modify expense was successful',
    props<{expense: Expense}>()
);

export const modifyExpenseFailure = createAction(
    '[ExpenseTracker] Modify expense failed',
    props<{error: string}>()
);

export const openDeleteDialog = createAction(
    '[ExpenseTracker] Open deleting expense dialog',
    props<{id: number}>()
);

export const deleteExpenseCanceled = createAction(
    '[ExpenseTracker] Delete expense was canceled'
);

export const deleteExpense = createAction(
    '[ExpenseTracker] Delete expense'
);

export const deleteExpenseSuccess = createAction(
    '[ExpenseTracker] Delete expense was successful'
);

export const deleteExpenseFailure = createAction(
    '[ExpenseTracker] Delete expense failed',
    props<{error: string}>()
);