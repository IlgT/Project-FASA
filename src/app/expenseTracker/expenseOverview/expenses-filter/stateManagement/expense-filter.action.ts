import { Action } from '@ngrx/store';
import { ExpenseFilter as ExpensesFilter } from 'src/app/expenseTracker/ExpenseFilter';

export const CHANGE_REASONS_FILTER = '[ExpenseTracker] Reasons filter was changed';
export const CHANGE_MONTH_FILTER = '[ExpenseTracker] Month filter was changed';
export const CHANGE_TAGS_FILTER = '[ExpenseTracker] Tags filter was changed';
export const LOAD_UTILIZED_VALUES ='[ExpenseTracker] Load utilized values for filter';
export const LOAD_UTILIZED_VALUES_SUCCESS ='[ExpenseTracker] Loading utilized values for filter was successfull';
export const LOAD_UTILIZED_VALUES_FAILURE ='[ExpenseTracker] Loading utilized values for filter failed';
export const UPDATE_FILTERS_SUCCESS = '[ExpenseTracker] Updating filters was successfull';
export const UPDATE_FILTERS_FAILURE = '[ExpenseTracker] Updating filters failed';

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

export class LoadUtilizedValues implements Action {
    readonly type = LOAD_UTILIZED_VALUES;
}

export class LoadUtilizedValuesSuccess implements Action {
    readonly type = LOAD_UTILIZED_VALUES_SUCCESS;

    constructor(public payload: ExpensesFilter) {}
}

export class LoadUtilizedValuesFailure implements Action {
    readonly type = LOAD_UTILIZED_VALUES_FAILURE;

    constructor(public payload: string) {}
}

export class UpdateFiltersSuccess implements Action {
    readonly type = UPDATE_FILTERS_SUCCESS;

    constructor(public payload: ExpensesFilter) {}
}

export class UpdateFiltersFailure implements Action {
    readonly type = UPDATE_FILTERS_FAILURE;

    constructor(public payload: string) {}
}

export type Actions = ChangeReasonsFilter
                    | ChangeMonthFilter
                    | ChangeTagsFilter
                    | LoadUtilizedValues
                    | LoadUtilizedValuesSuccess
                    | LoadUtilizedValuesFailure
                    | UpdateFiltersSuccess
                    | UpdateFiltersFailure;