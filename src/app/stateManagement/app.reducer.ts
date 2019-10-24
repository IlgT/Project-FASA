import * as fromExpense from '../expenseTracker/stateManagement/expense.reducer'
import { ActionReducerMap } from '@ngrx/store'


export interface AppState {
    expense: fromExpense.ExpenseState;
}

export const appReducer: ActionReducerMap<AppState> = {
    expense: fromExpense.expenseReducer
}