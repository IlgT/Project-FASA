import { Action } from '@ngrx/store';
import { Expense } from '../../expense';
import { Money } from '../../Money';
import * as ExpenseActions from './expense.action';
import { EXPENSES } from '../../expense.testdata';

export interface ExpenseState {
    month: number;
    expenses: Expense[];
    totalSum: Money;
    actualExpense: Expense | null;
    actualExpenseIndex: number;
  }

export const initialState: ExpenseState = {
    month: 11,
    expenses: EXPENSES,
    totalSum: {
        value: 0,
        currency: 'EUR'
    },
    actualExpense: null,
    actualExpenseIndex: -1
}

export function expenseReducer(state: ExpenseState = initialState, action: ExpenseActions.Actions) {
    console.log(action.type, state)

    switch(action.type) {
        case ExpenseActions.INITIALIZE_EXPENSE:
            return {
                ...action.payload
            };

        case ExpenseActions.ADD_EXPENSE:
            return {
                ...state,
                month: action.payload.month,
                expenses: [...state.expenses, action.payload.expense]
            };

        case ExpenseActions.START_MODIFY_EXPENSE:
            return {
                ...state,
                modifiedExpenseIndex: action.payload,
                modifiedExpense: { ...state.expenses[action.payload] }
            };
        
        case ExpenseActions.MODIFY_EXPENSE:
            const currentExpense = state.actualExpense;
            const modifiedExpense = {
                ...currentExpense,
                ...action.payload
            };

            const updatedExpenses = {...state.expenses};
            updatedExpenses[state.actualExpenseIndex] = modifiedExpense;

            return {
                ...state,
                expenses: updatedExpenses
            };

        case ExpenseActions.STOP_MODIFY_EXPENSE:
            return {
                ...state,
                modifiedExpenseIndex: -1,
                modifiedExpense: null
            };

        case ExpenseActions.DELETE_EXPENSE:
            return {
                ...state,
                expenses: state.expenses.filter((expense, expenseIndex) => {
                    return expenseIndex !== state.actualExpenseIndex;
                }),
                actualExpense: null,
                actualExpenseIndex: -1
            }

        default:
            return state;
    }
}