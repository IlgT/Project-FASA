import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ExpenseState } from './reducers/expense.reducers';
import { MatTableDataSource } from '@angular/material';

export const selectExpenseState =
    createFeatureSelector<ExpenseState>("expense");

export const isLoadingExpenses = createSelector(
    selectExpenseState,
    expenseState => expenseState.isLoading
);

export const actualExpense = createSelector(
    selectExpenseState,
    expenseState => expenseState.actualExpense
);

export const isEditMode = createSelector(
    selectExpenseState,
    expenseState => expenseState.actualExpenseIndex > -1
);

export const totalSum = createSelector(
    selectExpenseState,
    expenseState => expenseState.totalSum
);

export const expenseTableSource = createSelector(
    selectExpenseState,
    expenseState => new MatTableDataSource(expenseState.expenses)
);

export const expenseNoMistake = createSelector(
    selectExpenseState,
    expenseState => {var title = '';
                        title += expenseState.expenses[this.data.index].id;
                        title += " - ";
                        title += expenseState.expenses[this.data.index].reason;
                        title += " im Wert von ";
                        title += expenseState.expenses[this.data.index].amount.value;
                        title += expenseState.expenses[this.data.index].amount.currency
                        return title;}
);