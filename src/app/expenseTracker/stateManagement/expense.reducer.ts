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
        value: 200.00,
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

        case ExpenseActions.START_ADD_EXPENSE:
            return {
                ...state,
                actualExpense: action.payload
            }

        case ExpenseActions.ADD_EXPENSE:
            return {
                ...state,
                month: action.payload.month,
                expenses: [...state.expenses, action.payload.expense],
                totalSum: {
                    ...state.totalSum,
                    value: +state.totalSum.value + +action.payload.expense.amount.value
                }
            };

        case ExpenseActions.START_MODIFY_EXPENSE, ExpenseActions.START_DELETE_EXPENSE:
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
                expenses: updatedExpenses,
                totalSum: {
                    ...state.totalSum,
                    value: +state.totalSum + +currentExpense.amount.value
                }
            };

        case ExpenseActions.STOP_ADD_EXPENSE, ExpenseActions.STOP_MODIFY_EXPENSE, ExpenseActions.STOP_DELETE_EXPENSE:
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
                totalSum: {
                    ...state.totalSum,
                    value: +state.totalSum.value - +state.actualExpense.amount.value
                },
                actualExpense: null,
                actualExpenseIndex: -1
            }

        default:
            return state;
    }
}