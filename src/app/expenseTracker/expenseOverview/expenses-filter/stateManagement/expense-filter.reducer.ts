import * as ExpenseFilterActions from './expense-filter.action';

export interface ExpenseFilterState {
    isInitialize: boolean;
    filteredReasons: string[];
    filteredMonth: number | null;
    filteredTags: string[];
    utilizedReasons: string[];
    utilizedMonths: number[];
    utilizedTags: string[];
    currencies: string[];
    errorMessage: string | null
  }

export const initialState: ExpenseFilterState = {
    isInitialize: true,
    filteredReasons: [],
    filteredMonth: new Date().getMonth() + 1,
    filteredTags: [],
    utilizedReasons: [],
    utilizedMonths: [new Date().getMonth() + 1],
    utilizedTags: [],
    currencies: [],
    errorMessage: null
}

export function expenseFilterReducer(state: ExpenseFilterState = initialState, action: ExpenseFilterActions.Actions) {

    switch(action.type) {
        case ExpenseFilterActions.CHANGE_REASONS_FILTER:
            return {
                ...state,
                filteredReasons: action.payload
            }

        case ExpenseFilterActions.CHANGE_MONTH_FILTER:
            return {
                ...state,
                filteredMonth: action.payload
            }

        case ExpenseFilterActions.CHANGE_TAGS_FILTER:
            return {
                ...state,
                filteredTags: action.payload
            }

        case ExpenseFilterActions.LOAD_UTILIZED_VALUES:
            return {
                ...state,
                isInitialize: false
            }

        case ExpenseFilterActions.LOAD_UTILIZED_VALUES_SUCCESS:
        case ExpenseFilterActions.UPDATE_FILTERS_SUCCESS:
            return {
                ...state,
                utilizedReasons: action.payload.reasons,
                utilizedMonths: action.payload.months,
                utilizedTags: action.payload.tags,
                currencies: action.payload.currencies
            }
        
        case ExpenseFilterActions.LOAD_UTILIZED_VALUES_FAILURE:
        case ExpenseFilterActions.UPDATE_FILTERS_FAILURE:
            return {
                ...state,
                error: action.payload
            }

        default:
            return state;
    }
}