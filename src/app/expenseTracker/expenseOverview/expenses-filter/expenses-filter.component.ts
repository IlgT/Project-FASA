import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ResponsiveDesignService } from 'src/app/commons/services/responsive-design.service';
import { Store } from '@ngrx/store';
import * as fromExpenseFilter from './stateManagement/expense-filter.reducer';
import * as ExpenseFilterActions from './stateManagement/expense-filter.actions';
import { MatSelectChange } from '@angular/material';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/reducers/app.reducers';
import { openAddForm } from '../../expense.actions';

@Component({
  selector: 'app-expenses-filter',
  templateUrl: './expenses-filter.component.html',
  styleUrls: ['./expenses-filter.component.css']
})
export class ExpensesFilterComponent implements OnInit, OnDestroy {

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

  initializeSubscription: Subscription;
  expenseFilterSubscription: Subscription;

  constructor(public responsiveDesignService: ResponsiveDesignService,
              private store: Store<AppState>) {}

  ngOnInit() {
    this.initializePossibleFiltersOnce();
    this.expenseFilterSubscription = this.store
      .select('expenseFilter')
      .subscribe((expenseFilterState: fromExpenseFilter.ExpenseFilterState) => {
        this.utilizedReasons = expenseFilterState.utilizedReasons;
        this.utilizedMonths = [];
        for(let month of expenseFilterState.utilizedMonths) {
          this.utilizedMonths.push(this.months[month - 1]);
        }
        this.utilizedTags = expenseFilterState.utilizedTags;
        this.selectedReasons = expenseFilterState.filteredReasons;
        this.selectedMonth = this.months[expenseFilterState.filteredMonth - 1];
        this.selectedTags = expenseFilterState.filteredTags;
      });
  }

  private initializePossibleFiltersOnce() {
    let isInitialize: boolean;
    this.initializeSubscription = this.store.select('expenseFilter')
      .subscribe(state => isInitialize = state.isInitialize);
    if (isInitialize) {
      this.store.dispatch(ExpenseFilterActions.loadUtilizedValues());
    }
  }

  onReasonsChange(event: MatSelectChange) {
    this.store.dispatch(ExpenseFilterActions.changeReasonsFilter({reasons: this.selectedReasons}));
  }

  onMonthChange() {
    this.store.dispatch(ExpenseFilterActions.changeMonthFilter({month: this.months.indexOf(this.selectedMonth) + 1}));
  }

  onTagsChange(event: MatSelectChange) {
    this.store.dispatch(ExpenseFilterActions.changeTagsFilter({tags: this.selectedTags}));
  }
  
  onAdd() {
    this.store.dispatch(openAddForm());
  }

  ngOnDestroy() {
    this.initializeSubscription.unsubscribe();
    this.expenseFilterSubscription.unsubscribe();
  }
}
