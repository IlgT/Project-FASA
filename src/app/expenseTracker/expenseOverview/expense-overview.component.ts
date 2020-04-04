import { Component, OnInit , ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Expense } from '../model/Expense';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ResponsiveDesignService } from 'src/app/commons/services/responsive-design.service';
import { ExpenseService } from '../services/expense-service.service';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/reducers/app.reducers';
import { ExpenseState } from '../reducers/expense.reducers';
import { loadExpenseList, openAddForm } from '../expense.actions';
import { ContextMenuComponent } from 'src/app/commons/context-menu/context-menu.component';

@Component({
  selector: 'expenseTracker-overview',
  templateUrl: './expense-overview.component.html',
  styleUrls: ['./expense-overview.component.css']
})

export class ExpenseOverviewComponent implements OnInit, OnDestroy {
  reasons = new FormControl();
  displayedColumns: string[] = ["id", "value", "reason", "date", "originalAmount", "exchangeRate", "tag", "more"];
  expenses: MatTableDataSource<Expense>;
  totalSum: number;
  expenseSubscription: Subscription;
  expenseFilterSubscription: Subscription;
  isLoadingExpenses: boolean = false;
  isLoadingExpensesFilter: boolean = false;
  
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  
  constructor(private store: Store<AppState>,
              private _matDialog: MatDialog,
              public responsiveDesignService: ResponsiveDesignService,
              private expenseService: ExpenseService) {}

  ngOnInit() {
    this.initializeExpenseListOnce();
    this.expenseSubscription = this.store.select('expense').subscribe(
      (expenseState: ExpenseState) => {
        this.expenses = new MatTableDataSource(expenseState.expenses);
        this.totalSum = expenseState.totalSum.value;
        this.isLoadingExpenses = expenseState.isLoading;
      });
    this.enableTableSorting();
  }

  private initializeExpenseListOnce() {
    let isInitialize: boolean;
    this.expenseFilterSubscription = this.store.select('expenseFilter')
      .subscribe(state => {isInitialize = state.isInitialize;
                           this.isLoadingExpensesFilter = state.isLoading;});
    if (isInitialize) {
      this.store.dispatch(loadExpenseList());
    }
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

  onShowDialog(event: MouseEvent, index: number): void {
    const target = new ElementRef(event.currentTarget);
    const dialogRef = this._matDialog.open(ContextMenuComponent, {
      data: {
        trigger: target,
        index: index
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
    this.expenseFilterSubscription.unsubscribe();
  }

}