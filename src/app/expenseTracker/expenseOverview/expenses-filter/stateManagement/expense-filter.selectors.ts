import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ExpenseFilterState } from './expense-filter.reducer';

export const selectExpenseFilterState =
    createFeatureSelector<ExpenseFilterState>("expenseFilter");

export const isLoadingExpenseFilter = createSelector(
    selectExpenseFilterState,
    expenseFilterState => expenseFilterState.isLoading
);

export const utilizedTags = createSelector(
    selectExpenseFilterState,
    expenseFilterState => expenseFilterState.utilizedTags
);

export const utilizedMonths = createSelector(
    selectExpenseFilterState,
    expenseFilterState => expenseFilterState.utilizedMonths
);

export const utilizedReasons = createSelector(
    selectExpenseFilterState,
    expenseFilterState => expenseFilterState.utilizedReasons
);

export const filteredTags = createSelector(
    selectExpenseFilterState,
    expenseFilterState => expenseFilterState.filteredTags
);

export const filteredMonth = createSelector(
    selectExpenseFilterState,
    expenseFilterState => expenseFilterState.filteredMonth
);

export const filteredReasons = createSelector(
    selectExpenseFilterState,
    expenseFilterState => expenseFilterState.filteredReasons
);

export const utilizedCurrencies = createSelector(
    selectExpenseFilterState,
    expenseFilterState => expenseFilterState.currencies
);

export const isI = createSelector(
    selectExpenseFilterState,
    expenseFilterState => expenseFilterState.isInitialize
);

