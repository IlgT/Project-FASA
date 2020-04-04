import * as ExpenseFilterActions from './expense-filter.actions';
import { on, createReducer } from '@ngrx/store';

export interface ExpenseFilterState {
    isInitialize: boolean;
    filteredReasons: string[];
    filteredMonth: number | null;
    filteredTags: string[];
    utilizedReasons: string[];
    utilizedMonths: number[];
    utilizedTags: string[];
    currencies: string[];
    isLoading: boolean;
    errorMessage: string | null
  }

export const initialExpenseFilterState: ExpenseFilterState = {
    isInitialize: true,
    filteredReasons: [],
    filteredMonth: new Date().getMonth() + 1,
    filteredTags: [],
    utilizedReasons: [],
    utilizedMonths: [new Date().getMonth() + 1],
    utilizedTags: [],
    currencies: [],
    isLoading: false,
    errorMessage: null
}

export const expenseFilterReducer = createReducer(
    initialExpenseFilterState,
    on(ExpenseFilterActions.changeReasonsFilter, (state, action) => {
        return {
            ...state,
            filteredReasons: action.reasons
        }
    }),
    on(ExpenseFilterActions.changeMonthFilter, (state, action) => {
        return {
            ...state,
            filteredMonth: action.month
        }
    }),
    on(ExpenseFilterActions.changeTagsFilter, (state, action) => {
        return {
            ...state,
            filteredTags: action.tags
        }
    }),
    on(ExpenseFilterActions.loadUtilizedValues, (state, action) => {
        return {
            ...state,
            isInitialize: false,
            isLoading: true
        }
    }),
    on(ExpenseFilterActions.loadUtilizedValues, (state, action) => {
        return {
            ...state,
            isInitialize: false,
            isLoading: true
        }
    }),
    on(ExpenseFilterActions.loadUtilizedValuesSuccess,
        ExpenseFilterActions.updateFilterSuccess,
             (state, action) => {
        return {
            ...state,
            utilizedReasons: action.utilizedFilter.reasons,
            utilizedMonths: action.utilizedFilter.months,
            utilizedTags: action.utilizedFilter.tags,
            currencies: action.utilizedFilter.currencies,
            isLoading: false
        }
    }),
    on(ExpenseFilterActions.loadUtilizedValuesFailure,
        ExpenseFilterActions.updateFilterFailure,
             (state, action) => {
        return {
            ...state,
            error: action.error,
            isLoading: false
        }
    }))