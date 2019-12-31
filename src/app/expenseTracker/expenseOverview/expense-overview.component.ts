import { Component, OnInit , ViewChild, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { Expense } from '../../expense';
import * as fromApp from '../../stateManagement/app.reducer';
import * as ExpenseActions from '../stateManagement/expense.action';
import * as ExpenseFilterActions from './expenses-filter/stateManagement/expense-filter.action';
import * as fromExpense from '../stateManagement/expense.reducer';
import * as fromExpenseFilter from './expenses-filter/stateManagement/expense-filter.reducer';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { FormControl } from '@angular/forms';
import { ContextMenuComponent } from 'src/app/context-menu/context-menu.component';
import { MatDialog } from '@angular/material';
import { ResponsiveDesignService } from 'src/app/responsive-design.service';

@Component({
  selector: 'expenseTracker-overview',
  templateUrl: './expense-overview.component.html',
  styleUrls: ['./expense-overview.component.css']
})

export class ExpenseOverviewComponent implements OnInit {
  reasons = new FormControl();
  usedReasons: string[] = ["Kaufland", "Versicherung", "Disney World"]
  displayedColumns: string[] = ["id", "value", "reason", "date", "exchangeValue", "exchangeRate", "tag", "more"];
  expenses: MatTableDataSource<Expense>;
  totalSum: number;
  //subscription: Subscription;
  
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  
  constructor(private store: Store<fromApp.AppState>,
              private _matDialog: MatDialog,
              public responsiveDesignService: ResponsiveDesignService) {}

  ngOnInit() {
    //this.subscription = 
    this.store.dispatch(new ExpenseActions.LoadExpenseList());
    this.store.select('expense').subscribe(
      (expenseState: fromExpense.ExpenseState) => {
        this.expenses = new MatTableDataSource(expenseState.expenses);
        this.totalSum = expenseState.totalSum.value
      });
    this.enableTableSorting();
  }

  private enableTableSorting() {
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
    var selectedTags: string[];
    this.store
      .select('expenseFilter')
      .subscribe((expenseFilterState: fromExpenseFilter.ExpenseFilterState) =>
        selectedTags = [...expenseFilterState.filteredTags]
    );
    if (selectedTags.includes(tagName)) {
      selectedTags.splice(selectedTags.indexOf(tagName));
    } else {
      selectedTags.push(tagName);
    }
    this.store.dispatch(new ExpenseFilterActions.ChangeTagsFilter(selectedTags));
  }

  ngOnDestroy() {
    //this.subscription.unsubscribe();
  }

}