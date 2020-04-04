import { createAction, props } from '@ngrx/store';
import { UtilizedFilter } from 'src/app/expenseTracker/model/UtilizedFilter';

export const changeReasonsFilter = createAction(
    '[ExpenseTracker] Reasons filter was changed',
    props<{reasons: string[]}>()
)

export const changeMonthFilter = createAction(
    '[ExpenseTracker] Month filter was changed',
    props<{month: number}>()
)

export const changeTagsFilter = createAction(
    '[ExpenseTracker] Tags filter was changed',
    props<{tags: string[]}>()
)

export const loadUtilizedValues = createAction(
    '[ExpenseTracker] Load utilized values for filter'
)

export const loadUtilizedValuesSuccess = createAction(
    '[ExpenseTracker] Loading utilized values for filter was successfull',
    props<{utilizedFilter: UtilizedFilter}>()
)

export const loadUtilizedValuesFailure = createAction(
    '[ExpenseTracker] Loading utilized values for filter failed',
    props<{error: string}>()
)

export const updateFilterSuccess = createAction(
    '[ExpenseTracker] Updating filters was successfull',
    props<{utilizedFilter: UtilizedFilter}>()
)

export const updateFilterFailure = createAction(
    '[ExpenseTracker] Updating filters failed',
    props<{error: string}>()
)