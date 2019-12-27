import { Component, OnInit , ViewChild, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { Expense } from '../../expense';
import * as fromApp from '../../stateManagement/app.reducer';
import * as ExpenseActions from '../stateManagement/expense.action';
import * as fromExpense from '../stateManagement/expense.reducer';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { isNgTemplate } from '@angular/compiler';
import { FormControl } from '@angular/forms';
import { ContextMenuComponent } from 'src/app/context-menu/context-menu.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'expenseTracker-overview',
  templateUrl: './expense-overview.component.html',
  styleUrls: ['./expense-overview.component.css']
})

export class ExpenseOverviewComponent implements OnInit {
  reasons = new FormControl();
  usedReasons: string[] = ["Kaufland", "Versicherung", "Disney World"]
  displayedColumns: string[] = ["id", "value", "reason", "date", "exchangeValue", "exchangeRate", "tag", "more"];
  expenseState: fromExpense.ExpenseState;
  expenses: MatTableDataSource<Expense>;
  //subscription: Subscription;
  
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  
  constructor(private store: Store<fromApp.AppState>,
              private _matDialog: MatDialog) {}

  ngOnInit() {
    //this.subscription = 
    this.store.select('expense').subscribe(
      (expenseState: fromExpense.ExpenseState) => this.expenseState = expenseState);
    this.enableTableSorting();
    this.store.dispatch(new ExpenseActions.InitializeExpenseSuccess(this.expenseState));
  }

  private enableTableSorting() {
    this.expenses = new MatTableDataSource(this.expenseState.expenses);
    this.expenses.sortingDataAccessor = (expense, property) => {
      switch (property) {
        case 'value': return expense.amount.value;
        case 'tag': return expense.tags[0].name;
        case 'exchangeValue': return expense.exchangeValue.value;
        default: return expense[property];
      }
    };
    this.expenses.sort = this.sort;
  }

  /** Gets the total cost of all expenses. */
  getTotalCost(): number {
    return this.expenses.data.map(expense => expense.amount.value).reduce((acc, value) => acc + value, 0);
  }

  onShowDialog(evt: MouseEvent): void {
    const target = new ElementRef(evt.currentTarget);
    const dialogRef = this._matDialog.open(ContextMenuComponent, {
      data: {
        trigger: target
      },
      panelClass: 'custom-dialog-container'
    });
    dialogRef.afterClosed().subscribe( _res => {
      console.log(_res);
    });
  }

  ngOnDestroy() {
    //this.subscription.unsubscribe();
  }

}