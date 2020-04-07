import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ExpenseState, selectAll } from './reducers/expense.reducers';
import { MatTableDataSource } from '@angular/material';

export const selectExpenseState =
    createFeatureSelector<ExpenseState>("expense");

export const selectAllExpenses = createSelector(
    selectExpenseState,
    selectAll
);

export const isLoadingExpenses = createSelector(
    selectExpenseState,
    expenseState => expenseState.isLoading
);

export const getActualExpense = createSelector(
    selectExpenseState,
    expenseState => expenseState.actualExpense
);

export const isEditMode = createSelector(
    selectExpenseState,
    expenseState => expenseState.actualExpenseId !== null
);

export const getTotalSum = createSelector(
    selectExpenseState,
    expenseState => expenseState.totalSum
);

export const getExpenseNoMistakeTitle = createSelector(
    selectExpenseState,
    expenseState => {var title = '';
                        title += expenseState.actualExpenseId;
                        title += " - ";
                        title += expenseState.entities[expenseState.actualExpenseId].reason;
                        title += " im Wert von ";
                        title += expenseState.entities[expenseState.actualExpenseId].amount.value;
                        title += expenseState.entities[expenseState.actualExpenseId].amount.currency
                        return title;}
);