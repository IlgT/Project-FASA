import { Expense } from '../model/Expense';
import { Money } from '../model/Money';
import { defaultExpense } from '../model/expense.defaultdata';
import { ExpenseActions } from '../action-types';
import { on, createReducer } from '@ngrx/store';

export interface ExpenseState {
    expenses: Expense[];
    totalSum: Money;
    actualExpense: Expense | null;
    actualExpenseIndex: number;
    isLoading: boolean;
    errorMessage: string | null;
  }

export const initialExpenseState: ExpenseState = {
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

export const  expenseReducer = createReducer(
    initialExpenseState,
    on(ExpenseActions.loadExpenseList, (state, action) => {
        return {
         ...state,
        isLoading: true
        }
    }),
    on(ExpenseActions.loadExpenseListSuccess, (state, action) => {
        var newTotalSumValue: number = action.expenses.map(expense => expense.amount.value)
            .reduce((acc, value) => acc + value, 0)
            return {
                ...state,
                expenses: action.expenses,
                totalSum: {...state.totalSum,
                            value: newTotalSumValue},
                isLoading: false
            };
    }),
    on(ExpenseActions.loadExpenseListFailure, (state, action) => {
        return {
            ...state,
            errorMessage: action.error,
            isLoading: false
        };
    }),
    on(ExpenseActions.openAddForm, ExpenseActions.resetAddForm, (state, action) => {
        return {
            ...state,
            actualExpense: defaultExpense
        };
    }),
    on(ExpenseActions.addExpense, (state, action) => {
        return {
            ...state,
            actualExpense: action.expense
        };
    }),
    on(ExpenseActions.addExpenseSuccess, (state, action) => {
        return {
            ...state,
            actualExpense: defaultExpense,
            isLoading: true
        };
    }),
    on(ExpenseActions.addExpenseFailure, (state, action) => {
        return {
            ...state,
            actualExpense: defaultExpense,
            errorMessage: action.error
        };
    }),
    on(ExpenseActions.openModifyForm, ExpenseActions.openDeleteDialog, (state, action) => {
        return {
            ...state,
            actualExpenseIndex: action.index,
            actualExpense: { ...state.expenses[action.index] }
        };
    }),
    on(ExpenseActions.resetModifyForm, (state, action) => {
        return {
            ...state,
            actualExpense: {...defaultExpense,
                            id: state.expenses[state.actualExpenseIndex].id}
        };
    }),
    on(ExpenseActions.modifyExpense, (state, action) => {
        const modifiedExpense = {
            ...state.actualExpense,
            ...action.expense,
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
    }),
    on(ExpenseActions.modifyExpenseSuccess, (state, action) => {
        var updatedExpenses: Expense[] = [...state.expenses];
            updatedExpenses[state.actualExpenseIndex] = action.expense;
        var newTotalSumValue: number = updatedExpenses.map(expense => expense.amount.value)
            .reduce((acc, value) => acc + value, 0);

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
    }),
    on(ExpenseActions.modifyExpenseFailure,
        ExpenseActions.deleteExpenseFailure,
        (state, action) => {
        return {
            ...state,
            actualExpense: defaultExpense,
            actualExpenseIndex: -1,
            errorMessage: action.error
        };
    }),
    on(ExpenseActions.addExpenseCanceled,
        ExpenseActions.modifyExpenseCanceled,
        ExpenseActions.deleteExpenseCanceled,
        (state, action) => {
        return {
            ...state,
            actualExpense: defaultExpense,
            actualExpenseIndex: -1,
        };
    }),
    on(ExpenseActions.deleteExpense,
        (state, action) => {
        return {
            ...state
        };
    }),
    on(ExpenseActions.deleteExpenseSuccess,
        (state, action) => {
        var updatedExpenses: Expense[] = state.expenses.filter((expense, expenseIndex) => {
            return expenseIndex !== state.actualExpenseIndex; });
        var newTotalSumValue: number = updatedExpenses.map(expense => expense.amount.value)
            .reduce((acc, value) => acc + value, 0);

        return {
            ...state,
            expenses: updatedExpenses,
            totalSum: {...state.totalSum,
                        value: newTotalSumValue},
            actualExpense: defaultExpense,
            actualExpenseIndex: -1
        };
    })
)