import * as fromExpense from '../expenseTracker/stateManagement/expense.reducer';
import * as fromExpenseFilter from '../expenseTracker/expenseOverview/expenses-filter/stateManagement/expense-filter.reducer';
import { ActionReducerMap, ActionReducer } from '@ngrx/store';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';

export interface AppState {
    expense: fromExpense.ExpenseState;
    expenseFilter: fromExpenseFilter.ExpenseFilterState;
    router: RouterReducerState;
}

export const appReducer: ActionReducerMap<AppState> = {
    expense: fromExpense.expenseReducer as ActionReducer<fromExpense.ExpenseState>,
    expenseFilter: fromExpenseFilter.expenseFilterReducer as ActionReducer<fromExpenseFilter.ExpenseFilterState>,
    router: routerReducer as ActionReducer<RouterReducerState>
}