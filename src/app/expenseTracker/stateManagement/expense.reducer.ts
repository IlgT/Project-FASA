import { Expense } from '../../expense';
import { Money } from '../../Money';
import * as ExpenseActions from './expense.action';
import { EXPENSES } from '../../expense.testdata';
import { defaultExpense } from '../expense.defaultdata';

export interface ExpenseState {
    reasons: string[];
    month: number | null;
    tags: string[];
    expenses: Expense[];
    totalSum: Money;
    actualExpense: Expense | null;
    actualExpenseIndex: number;
    errorMessage: string | null;
  }

export const initialState: ExpenseState = {
    reasons: [],
    month: new Date().getMonth() + 1,
    tags: [],
    expenses: [],
    totalSum: {
        value: 0.00,
        currency: 'EUR'
    },
    actualExpense: defaultExpense,
    actualExpenseIndex: -1,
    errorMessage: null
}

export function expenseReducer(state: ExpenseState = initialState, action: ExpenseActions.Actions) {
    console.log(action.type, state)

    switch(action.type) {
        case ExpenseActions.LOAD_EXPENSE_LIST:
            return {
                ...state
            };

        case ExpenseActions.LOAD_EXPENSE_LIST_SUCCESS:
            return {
                ...state,
                expenses: action.payload
            };

        case ExpenseActions.LOAD_EXPENSE_LIST_FAILURE:
            return {
                ...state,
                errorMessage: action.payload
            };
        
        case ExpenseActions.START_ADD_EXPENSE:
            return {
                ...state,
                actualExpense: defaultExpense
            };

        case ExpenseActions.RESET_ADD_FORM:
            return {
                ...state,
                actualExpense: defaultExpense
            }

        case ExpenseActions.ADD_EXPENSE:
            return {
                ...state,
                actualExpense: action.payload
            };
            
        case ExpenseActions.ADD_EXPENSE_SUCCESS:
            return {
                ...state,
                actualExpense: defaultExpense
            };

        case ExpenseActions.ADD_EXPENSE_FAILURE:
            return {
                ...state,
                actualExpense: defaultExpense,
                errorMessage: action.payload
            };

        case ExpenseActions.START_MODIFY_EXPENSE:
        case ExpenseActions.START_DELETE_EXPENSE:
            return {
                ...state,
                actualExpenseIndex: action.payload,
                actualExpense: { ...state.expenses[action.payload] }
            };

        case ExpenseActions.RESET_MODIFY_FORM:
            return {
                ...state,
                actualExpense: {...defaultExpense,
                                id: state.expenses[state.actualExpenseIndex].id}
            }
        
        case ExpenseActions.MODIFY_EXPENSE:
            const modifiedExpense = {
                ...state.actualExpense,
                ...action.payload
            };

            return {
                ...state,
                actualExpense: modifiedExpense,
            };

        case ExpenseActions.MODIFY_EXPENSE_SUCCESS:
            const updatedExpenses = {...state.expenses};
            updatedExpenses[state.actualExpenseIndex] = action.payload;

            return {
                ...state,
                totalSum: {
                    ...state.totalSum,
                    value: +state.totalSum.value - +state.expenses[state.actualExpenseIndex] + +state.actualExpense.amount.value
                },
                expenses: updatedExpenses,
                actualExpense: defaultExpense,
                actualExpenseIndex: -1
            };

        case ExpenseActions.MODIFY_EXPENSE_FAILURE:
            return {
                ...state,
                actualExpense: defaultExpense,
                actualExpenseIndex: -1,
                errorMessage: action.payload
            };

        case ExpenseActions.ADD_EXPENSE_CANCELED:
        case ExpenseActions.MODIFY_EXPENSE_CANCELED:
        case ExpenseActions.DELETE_EXPENSE_CANCELED:
            return {
                ...state,
                actualExpense: defaultExpense,
                actualExpenseIndex: -1,
            }; 
            
        case ExpenseActions.DELETE_EXPENSE:
            return {
                ...state
            };

        case ExpenseActions.DELETE_EXPENSE_SUCCESS:
            return {
                ...state,
                expenses: state.expenses.filter((expense, expenseIndex) => {
                        return expenseIndex !== state.actualExpenseIndex;
                }),
                actualExpense: defaultExpense,
                actualExpenseIndex: -1
            };
        
        case ExpenseActions.DELETE_EXPENSE_FAILURE:
            return {
                ...state,
                actualExpense: defaultExpense,
                actualExpenseIndex: -1,
                errorMessage: action.payload
            }

        case ExpenseActions.CHANGE_REASONS_FILTER:
            return {
                ...state,
                reasons: action.payload
            }

        case ExpenseActions.CHANGE_MONTH_FILTER:
            return {
                ...state,
                month: action.payload
            }

        case ExpenseActions.CHANGE_TAGS_FILTER:
            return {
                ...state,
                tags: action.payload
            }

        case ExpenseActions.FILTER_CHANGES_APPLIED:
            return {
                ...state,
                expenses: action.payload
            }

        default:
            return state;
    }
}