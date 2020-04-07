import { Component, OnInit , ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Expense } from '../model/Expense';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ResponsiveDesignService } from 'src/app/commons/services/responsive-design.service';
import { ExpenseService } from '../services/expense-service.service';
import { Subscription, Observable, of } from 'rxjs';
import { AppState } from 'src/app/reducers/app.reducers';
import { loadExpenseList, openAddForm } from '../expense.actions';
import { ContextMenuComponent } from 'src/app/commons/context-menu/context-menu.component';
import { getTotalSum, isLoadingExpenses, selectAllExpenses } from '../expense.selectors';
import { Money } from '../model/Money';
import { isLoadingExpenseFilter, isInitialize } from './expenses-filter/stateManagement/expense-filter.selectors';
import { tap } from 'rxjs/operators';

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
      .pipe(tap(dataSource => this.expenses = new MatTableDataSource(dataSource))).subscribe();
    this.totalSum$ = this.store.pipe(select(getTotalSum));
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