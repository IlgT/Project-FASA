import { Component, OnInit , ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Expense } from '../../expense';
import * as fromApp from '../../stateManagement/app.reducer';
import * as ExpenseActions from '../stateManagement/expense.action';
import * as fromExpense from '../stateManagement/expense.reducer';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { FormControl } from '@angular/forms';
import { ContextMenuComponent } from 'src/app/context-menu/context-menu.component';
import { MatDialog } from '@angular/material';
import { ResponsiveDesignService } from 'src/app/responsive-design.service';
import { ExpenseService } from '../expense-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'expenseTracker-overview',
  templateUrl: './expense-overview.component.html',
  styleUrls: ['./expense-overview.component.css']
})

export class ExpenseOverviewComponent implements OnInit, OnDestroy {
  reasons = new FormControl();
  usedReasons: string[] = ["Kaufland", "Versicherung", "Disney World"]
  displayedColumns: string[] = ["id", "value", "reason", "date", "exchangeValue", "exchangeRate", "tag", "more"];
  expenses: MatTableDataSource<Expense>;
  totalSum: number;
  expenseSubscription: Subscription;
  expenseFilterSubscription: Subscription;
  isLoadingExpenses: boolean = false;
  isLoadingExpensesFilter: boolean = false;
  
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  
  constructor(private store: Store<fromApp.AppState>,
              private _matDialog: MatDialog,
              public responsiveDesignService: ResponsiveDesignService,
              private expenseService: ExpenseService) {}

  ngOnInit() {
    this.initializeExpenseListOnce();
    this.expenseSubscription = this.store.select('expense').subscribe(
      (expenseState: fromExpense.ExpenseState) => {
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
      this.store.dispatch(new ExpenseActions.LoadExpenseList());
    }
  }

  private enableTableSorting() {
    this.expenses.sortingDataAccessor = (expense, property) => {
      switch (property) {
        case 'value': return expense.amount.value;
        case 'tag': return expense.tags[0];
        case 'exchangeValue': return expense.exchangeValue.value;
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
    this.store.dispatch(new ExpenseActions.StartAddExpense());
  }

  onTagClick(tagName: string) {
    this.expenseService.updatefilteredTagsDueToTagClick(tagName);
  }

  ngOnDestroy() {
    this.expenseSubscription.unsubscribe();
    this.expenseFilterSubscription.unsubscribe();
  }

}