import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ExpenseFilterState } from './expense-filter.reducer';

export const selectExpenseFilterState =
    createFeatureSelector<ExpenseFilterState>("expenseFilter");

export const isLoadingExpenseFilter = createSelector(
    selectExpenseFilterState,
    expenseFilterState => expenseFilterState.isLoading
);

export const getCurrencies = createSelector(
    selectExpenseFilterState,
    expenseFilterState => expenseFilterState.currencies
);

export const getUtilizedTags = createSelector(
    selectExpenseFilterState,
    expenseFilterState => expenseFilterState.utilizedTags
);

export const getUtilizedMonths = createSelector(
    selectExpenseFilterState,
    expenseFilterState => expenseFilterState.utilizedMonths
);

export const getUtilizedReasons = createSelector(
    selectExpenseFilterState,
    expenseFilterState => expenseFilterState.utilizedReasons
);

export const getFilteredTags = createSelector(
    selectExpenseFilterState,
    expenseFilterState => expenseFilterState.filteredTags
);

export const getFilteredMonth = createSelector(
    selectExpenseFilterState,
    expenseFilterState => expenseFilterState.filteredMonth
);

export const getFilteredReasons = createSelector(
    selectExpenseFilterState,
    expenseFilterState => expenseFilterState.filteredReasons
);

export const getUtilizedCurrencies = createSelector(
    selectExpenseFilterState,
    expenseFilterState => expenseFilterState.currencies
);

export const isInitialize = createSelector(
    selectExpenseFilterState,
    expenseFilterState => expenseFilterState.isInitialize
);

