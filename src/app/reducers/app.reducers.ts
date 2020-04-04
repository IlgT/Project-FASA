import * as fromExpenseFilter from '../expenseTracker/expenseOverview/expenses-filter/stateManagement/expense-filter.reducer';
import { ActionReducerMap, ActionReducer } from '@ngrx/store';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { ExpenseState, expenseReducer } from '../expenseTracker/reducers/expense.reducers';

export interface AppState {
    expense: ExpenseState;
    expenseFilter: fromExpenseFilter.ExpenseFilterState;
    router: RouterReducerState;
}

export const appReducers: ActionReducerMap<AppState> = {
    expense: expenseReducer as ActionReducer<ExpenseState>,
    expenseFilter: fromExpenseFilter.expenseFilterReducer as ActionReducer<fromExpenseFilter.ExpenseFilterState>,
    router: routerReducer as ActionReducer<RouterReducerState>
}