import { Expense } from '../../expense';
import { Money } from '../../Money';
import * as ExpenseActions from './expense.action';
import { defaultExpense } from '../expense.defaultdata';

export interface ExpenseState {
    expenses: Expense[];
    totalSum: Money;
    actualExpense: Expense | null;
    actualExpenseIndex: number;
    isLoading: boolean;
    errorMessage: string | null;
  }

export const initialState: ExpenseState = {
    expenses: [],
    totalSum: {
        value: 0.00,
        currency: 'EUR'
    },
    actualExpense: defaultExpense,
    actualExpenseIndex: -1,
    isLoading: false,
    errorMessage: null
}

export function expenseReducer(state: ExpenseState = initialState, action: ExpenseActions.Actions) {

    switch(action.type) {
        case ExpenseActions.LOAD_EXPENSE_LIST:
            return {
                ...state,
                isLoading: true
            };

        case ExpenseActions.LOAD_EXPENSE_LIST_SUCCESS:
            var newTotalSumValue: number = action.payload.map(expense => expense.amount.value).reduce((acc, value) => acc + value, 0)
            return {
                ...state,
                expenses: action.payload,
                totalSum: {...state.totalSum,
                            value: newTotalSumValue},
                isLoading: false
            };

        case ExpenseActions.LOAD_EXPENSE_LIST_FAILURE:
            return {
                ...state,
                errorMessage: action.payload,
                isLoading: false
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
                actualExpense: defaultExpense,
                isLoading: true
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
                ...action.payload,
                amount: {
                    ...state.actualExpense.amount,
                    value: null
                },
                exchangeRate: null
            };

            return {
                ...state,
                actualExpense: modifiedExpense,
            };

        case ExpenseActions.MODIFY_EXPENSE_SUCCESS:
            var updatedExpenses: Expense[] = [...state.expenses];
            updatedExpenses[state.actualExpenseIndex] = action.payload;
            var newTotalSumValue: number = updatedExpenses.map(expense => expense.amount.value).reduce((acc, value) => acc + value, 0);

            return {
                ...state,
                totalSum: {
                    ...state.totalSum,
                    value: newTotalSumValue
                },
                expenses: updatedExpenses,
                actualExpense: defaultExpense,
                actualExpenseIndex: -1
            };

        case ExpenseActions.MODIFY_EXPENSE_FAILURE:
        case ExpenseActions.DELETE_EXPENSE_FAILURE:
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
            var updatedExpenses: Expense[] = state.expenses.filter((expense, expenseIndex) => {
                return expenseIndex !== state.actualExpenseIndex; });
            var newTotalSumValue: number = updatedExpenses.map(expense => expense.amount.value).reduce((acc, value) => acc + value, 0);

            return {
                ...state,
                expenses: updatedExpenses,
                totalSum: {...state.totalSum,
                            value: newTotalSumValue},
                actualExpense: defaultExpense,
                actualExpenseIndex: -1
            };
        
        default:
            return state;
    }
}