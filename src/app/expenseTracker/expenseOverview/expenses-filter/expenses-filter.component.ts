import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Tag } from 'src/app/Tag';
import { Observable, fromEvent } from 'rxjs';
import { debounceTime, map, startWith } from 'rxjs/operators';
import { ResponsiveDesignService } from 'src/app/responsive-design.service';
import { Store } from '@ngrx/store';
import * as fromApp from 'src/app/stateManagement/app.reducer';
import * as fromExpenseFilter from './stateManagement/expense-filter.reducer';
import * as ExpenseFilterActions from './stateManagement/expense-filter.action';
import * as ExpenseActions from '../../stateManagement/expense.action';
import { MatSelectChange } from '@angular/material';

@Component({
  selector: 'app-expenses-filter',
  templateUrl: './expenses-filter.component.html',
  styleUrls: ['./expenses-filter.component.css']
})
export class ExpensesFilterComponent implements OnInit {

  months: string[] = ["Januar", "Februar", "März", "April", "Mai",
                      "Juni", "Juli", "August", "September", "Oktober",
                      "November", "Dezember"];
  
  utilizedReasons: string[];
  utilizedMonths: string[];
  utilizedTags: string[];
  
  reasonsControl = new FormControl();
  monthControl = new FormControl();
  tagsControl = new FormControl();

  selectedReasons: string[];
  selectedMonth: string;
  selectedTags: string[];

  constructor(public responsiveDesignService: ResponsiveDesignService,
              private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.initializePossibleFiltersOnce();
    this.store
      .select('expenseFilter')
      .subscribe((expenseFilterState: fromExpenseFilter.ExpenseFilterState) => {
        this.utilizedReasons = expenseFilterState.utilizedReasons;
        this.utilizedMonths = [];
        for(let month of expenseFilterState.utilizedMonths) {
          this.utilizedMonths.push(this.months[month - 1]);
        }
        this.utilizedTags = expenseFilterState.utilizedTags;
        this.selectedReasons = expenseFilterState.filteredReasons;
        this.selectedMonth = this.utilizedMonths[expenseFilterState.filteredMonth - 1];
        this.selectedTags = expenseFilterState.filteredTags;
      });
  }

  private initializePossibleFiltersOnce() {
    let isInitialize: boolean;
    this.store.select('expenseFilter')
      .subscribe(state => isInitialize = state.isInitialize);
    if (isInitialize) {
      this.store.dispatch(new ExpenseFilterActions.LoadUtilizedValues());
    }
  }

  onReasonsChange(event: MatSelectChange) {
    this.store.dispatch(new ExpenseFilterActions.ChangeReasonsFilter(this.selectedReasons));
  }

  onMonthChange() {
    this.store.dispatch(new ExpenseFilterActions.ChangeMonthFilter(this.utilizedMonths.indexOf(this.selectedMonth) + 1));
  }

  onTagsChange(event: MatSelectChange) {
    this.store.dispatch(new ExpenseFilterActions.ChangeTagsFilter(this.selectedTags));
  }
  
  onAdd() {
    this.store.dispatch(new ExpenseActions.StartAddExpense());
  }
}
