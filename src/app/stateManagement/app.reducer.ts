import * as fromExpense from '../expenseTracker/stateManagement/expense.reducer';
import * as fromExpenseFilter from '../expenseTracker/expenseOverview/expenses-filter/stateManagement/expense-filter.reducer';
import { ActionReducerMap } from '@ngrx/store';


export interface AppState {
    expense: fromExpense.ExpenseState;
    expenseFilter: fromExpenseFilter.ExpenseFilterState;
}

export const appReducer: ActionReducerMap<AppState> = {
    expense: fromExpense.expenseReducer,
    expenseFilter: fromExpenseFilter.expenseFilterReducer
}