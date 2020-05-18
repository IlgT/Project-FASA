import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { select, Store } from '@ngrx/store';
import { Observable, of, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ContextMenuComponent } from 'src/app/commons/context-menu/context-menu.component';
import { ResponsiveDesignService } from 'src/app/commons/services/responsive-design.service';
import { AppState } from 'src/app/reducers/app.reducers';
import { openAddForm } from '../expense.actions';
import { isLoadingExpenses, selectAllExpenses } from '../expense.selectors';
import { Expense } from '../model/Expense';
import { Money } from '../model/Money';
import { ExpenseService } from '../services/expense-service.service';
import { isLoadingExpenseFilter } from './expenses-filter/stateManagement/expense-filter.selectors';

@Component({
  selector: 'expenseTracker-overview',
  templateUrl: './expense-overview.component.html',
  styleUrls: ['./expense-overview.component.css']
})

export class ExpenseOverviewComponent implements OnInit, OnDestroy {
  reasons = new FormControl();
  displayedColumns: string[] = ["id", "value", "reason", "date", "originalAmount", "exchangeRate", "tag", "more"];
  expenses: MatTableDataSource<Expense>;
  totalSum$: Observable<Money>;
  expenseSubscription: Subscription;
  intizalizingSubscription: Subscription;
  isLoadingExpenses$: Observable<boolean> = of(false);
  isLoadingExpensesFilter$: Observable<boolean> = of(false);
  
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  
  constructor(private store: Store<AppState>,
              private _matDialog: MatDialog,
              public responsiveDesignService: ResponsiveDesignService,
              private expenseService: ExpenseService) {}

  ngOnInit() {
    this.isLoadingExpensesFilter$ = this.store.pipe(select(isLoadingExpenseFilter));
    this.expenseSubscription = this.store.pipe(select(selectAllExpenses))
      .pipe(tap((dataSource: Expense[]) => {
        var filteredExpense = dataSource.filter(expense => this.expenseService.isMatchingFilters(expense));
        this.expenses = new MatTableDataSource(filteredExpense);
        var totalSumValue = filteredExpense.map(expense => expense.amount.value)
          .reduce((acc, value) => acc + value, 0);
        this.totalSum$ = of({value: totalSumValue,
                             currency: 'EUR'});
      })).subscribe();
    this.isLoadingExpenses$ = this.store.pipe(select(isLoadingExpenses));
    this.enableTableSorting();
  }

  private enableTableSorting() {
    this.expenses.sortingDataAccessor = (expense, property) => {
      switch (property) {
        case 'value': return expense.amount.value;
        case 'tag': return expense.tags[0];
        case 'originalAmount': return expense.originalAmount.value;
        default: return expense[property];
      }
    };
    this.expenses.sort = this.sort;
  }

  onShowDialog(event: MouseEvent, id: number): void {
    const target = new ElementRef(event.currentTarget);
    const dialogRef = this._matDialog.open(ContextMenuComponent, {
      data: {
        trigger: target,
        id: id
      }
    });
  }

  onAdd() {
    this.store.dispatch(openAddForm());
  }

  onTagClick(tagName: string) {
    this.expenseService.updatefilteredTagsDueToTagClick(tagName);
  }

  ngOnDestroy() {
    this.expenseSubscription.unsubscribe();
  }

}