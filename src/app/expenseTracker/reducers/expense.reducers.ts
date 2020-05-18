import { Expense, compareExpensesDate } from '../model/Expense';
import { Money } from '../model/Money';
import { defaultExpense } from '../model/expense.defaultdata';
import { ExpenseActions } from '../action-types';
import { on, createReducer } from '@ngrx/store';
import { EntityState, createEntityAdapter } from '@ngrx/entity';

export interface ExpenseState extends EntityState<Expense> {
    actualExpense: Expense | null;
    actualExpenseId: number | null;
    isLoading: boolean;
    errorMessage: string | null;
}

export const expenseAdapter = createEntityAdapter<Expense>({
    sortComparer: compareExpensesDate
});

export const initialExpenseState = expenseAdapter.getInitialState({
    actualExpense: defaultExpense,
    actualExpenseId: null,
    isLoading: false,
    errorMessage: null
});

export const  expenseReducer = createReducer(
    initialExpenseState,
    on(ExpenseActions.loadExpenseList, (state, action) => {
        return {
         ...state,
        isLoading: true
        }
    }),
    on(ExpenseActions.loadExpenseListSuccess, (state, action) => {
            expenseAdapter.removeAll(state);
            return expenseAdapter.addAll(
                action.expenses,
                {
                ...state,
                isLoading: false
            })
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
            actualExpense: defaultExpense,
            actualExpenseId: null
        };
    }),
    on(ExpenseActions.addExpense, (state, action) => {
        return {
            ...state,
            actualExpense: action.expense
        };
    }),
    on(ExpenseActions.addExpenseSuccess,
        (state, action) => {
            return {
                ...state,
                actualExpense: defaultExpense,
                isLoading: true
            }
        }
    ),
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
            actualExpenseId: action.id,
            actualExpense: { ...state.entities[action.id] }
        };
    }),
    on(ExpenseActions.resetModifyForm, (state, action) => {
        return {
            ...state,
            actualExpense: {...defaultExpense,
                            id: state.actualExpenseId}
        };
    }),
    on(ExpenseActions.removeExpenseToBeModified,
        (state, action) => expenseAdapter.removeOne(
            action.expense.id,
            {
            ...state,
            actualExpenseId: action.expense.id,
            actualExpense: action.expense,
            isLoading: false
        })
    ),
    on(ExpenseActions.ModifyExpense,
        (state, action) => expenseAdapter.updateOne(
            action.expense,
            {
                ...state,
                actualExpense: {...state.actualExpense,
                                ...action.expense.changes},
            }
        )
    ),
    on(ExpenseActions.modifyExpenseSuccess,
        ExpenseActions.modifyExpenseNotMathingFiltersSuccess,
        (state, action) => {
        return {
            ...state,
            actualExpense: defaultExpense,
            actualExpenseId: null,
            isLoading: true
        };
    }),
    on(ExpenseActions.modifyExpenseFailure,
        ExpenseActions.deleteExpenseFailure,
        (state, action) => {
        return {
            ...state,
            actualExpense: defaultExpense,
            actualExpenseId: null,
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
            actualExpenseId: null,
        };
    }),
    on(ExpenseActions.deleteExpense,
        (state, action) => expenseAdapter.removeOne(
                state.actualExpenseId,
                state)
    ),
    on(ExpenseActions.deleteExpenseSuccess,
        (state, action) => {
        return {
            ...state,
            actualExpense: defaultExpense,
            actualExpenseId: null
        };
    })
);

export const {
    selectAll
} = expenseAdapter.getSelectors();