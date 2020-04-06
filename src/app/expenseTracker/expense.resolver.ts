import { AppState } from '../reducers/app.reducers';
import { Store, select } from '@ngrx/store';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { isInitialize } from './expenseOverview/expenses-filter/stateManagement/expense-filter.selectors';
import { loadExpenseList } from './expense.actions';
import { finalize, first, filter, tap } from 'rxjs/operators';
import { loadUtilizedValues } from './expenseOverview/expenses-filter/stateManagement/expense-filter.actions';

@Injectable()
export class ExpenseResolver implements Resolve<any> {
    isLoading = false;

    constructor(private store: Store<AppState>) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        return this.store
            .pipe(
                select(isInitialize),
                tap(isInitialize => {
                    if(!this.isLoading && isInitialize) {
                        this.isLoading = true;
                        this.store.dispatch(loadExpenseList());
                        this.store.dispatch(loadUtilizedValues())
                    }
                }),
                filter(isInitialize => !isInitialize),
                first(),
                finalize(() => this.isLoading = false)
            );
    }
}