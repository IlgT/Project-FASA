import { Action } from '@ngrx/store';
import { Expense } from '../../expense';
import { Money } from '../../Money';
import * as ExpenseActions from './expense.action';
import { EXPENSES } from '../../expense.testdata';
import { defaultExpense } from '../expense.defaultdata';

export interface ExpenseState {
    month: number;
    tag: String;
    expenses: Expense[];
    totalSum: Money;
    actualExpense: Expense | null;
    actualExpenseIndex: number | null;
    errorMessage: String;
  }

export const initialState: ExpenseState = {
    month: 11,
    tag: '',
    expenses: EXPENSES,
    totalSum: {
        value: 200.00,
        currency: 'EUR'
    },
    actualExpense: null,
    actualExpenseIndex: -1,
    errorMessage: null
}

export function expenseReducer(state: ExpenseState = initialState, action: ExpenseActions.Actions) {
    console.log(action.type, state)

    switch(action.type) {
        //case ExpenseActions.INITIALIZE_EXPENSE:
            //return {
                //...state
            //};

        case ExpenseActions.INITIALIZE_EXPENSE_SUCCESS:
            return {
                ...action.payload
            };

        case ExpenseActions.INITIALIZE_EXPENSE_FAILURE:
            return {
                ...state,
                errorMessage: action.payload
            };
        
        case ExpenseActions.START_ADD_EXPENSE:
            return {
                ...state,
                actualExpense: defaultExpense
            };

        case ExpenseActions.ADD_EXPENSE:
            return {
                ...state,
                actualExpense: action.payload
            };
            
        case ExpenseActions.ADD_EXPENSE_SUCCESS:
            return {
                ...state,
                //month: state.actualExpense.date,
                expenses: [...state.expenses, state.actualExpense],
                totalSum: {
                    ...state.totalSum,
                    value: +state.totalSum.value + +state.actualExpense.amount.value
                },
                actualExpense: null
            };

        case ExpenseActions.ADD_EXPENSE_FAILURE:
            return {
                ...state,
                actualExpense: null,
                errorMessage: action.payload
            };

        case ExpenseActions.START_MODIFY_EXPENSE, ExpenseActions.START_DELETE_EXPENSE:
            return {
                ...state,
                modifiedExpenseIndex: action.payload,
                modifiedExpense: { ...state.expenses[action.payload] }
            };
        
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
            updatedExpenses[state.actualExpenseIndex] = state.actualExpense;

            return {
                ...state,
                //month: state.actualExpense.date,
                totalSum: {
                    ...state.totalSum,
                    value: +state.totalSum.value - +state.expenses[state.actualExpenseIndex] + +state.actualExpense.amount.value
                },
                expenses: updatedExpenses,
                actualExpense: null,
                actualExpenseIndex: -1
            };

        case ExpenseActions.MODIFY_EXPENSE_FAILURE:
            return {
                ...state,
                actualExpense: null,
                actualExpenseIndex: -1,
                errorMessage: action.payload
            };
            
        //case ExpenseActions.DELETE_EXPENSE:
            //return {
                //...state
            //};

        case ExpenseActions.DELETE_EXPENSE_SUCCESS:
            return {
                ...state,
                //month: state.actualExpense.date,
                expenses: state.expenses.filter((expense, expenseIndex) => {
                        return expenseIndex !== state.actualExpenseIndex;
                }),
                totalSum: {
                    ...state.totalSum,
                    value: +state.totalSum.value - +state.actualExpense.amount.value
                },
                actualExpense: null,
                actualExpenseIndex: -1
            };
        
        case ExpenseActions.DELETE_EXPENSE_FAILURE:
            return {
                ...state,
                actualExpense: null,
                actualExpenseIndex: -1,
                errorMessage: action.payload
            }

        default:
            return state;
    }
}