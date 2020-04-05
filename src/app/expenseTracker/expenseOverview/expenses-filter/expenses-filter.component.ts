import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ResponsiveDesignService } from 'src/app/commons/services/responsive-design.service';
import { Store, select } from '@ngrx/store';
import * as ExpenseFilterActions from './stateManagement/expense-filter.actions';
import { MatSelectChange } from '@angular/material';
import { Subscription, Observable } from 'rxjs';
import { AppState } from 'src/app/reducers/app.reducers';
import { openAddForm } from '../../expense.actions';
import { tap } from 'rxjs/operators';
import { isInitialize, getFilteredReasons, getFilteredMonth, getFilteredTags, getUtilizedReasons, getUtilizedMonths, getUtilizedTags } from './stateManagement/expense-filter.selectors';

@Component({
  selector: 'app-expenses-filter',
  templateUrl: './expenses-filter.component.html',
  styleUrls: ['./expenses-filter.component.css']
})
export class ExpensesFilterComponent implements OnInit, OnDestroy {

  months: string[] = ["Januar", "Februar", "März", "April", "Mai",
                      "Juni", "Juli", "August", "September", "Oktober",
                      "November", "Dezember"];
  
  utilizedReasons$: Observable<string[]>;
  utilizedMonths$: Observable<number[]>;
  utilizedTags$: Observable<string[]>;
  
  selectedReasons = new FormControl();
  selectedMonth = new FormControl();
  selectedTags = new FormControl();

  reasonsSubscription: Subscription;
  monthSubscription: Subscription;
  tagsSubscription: Subscription;
  initializeSubscription: Subscription;

  constructor(public responsiveDesignService: ResponsiveDesignService,
              private store: Store<AppState>) {}

  ngOnInit() {
    this.initializePossibleFiltersOnce();
    this.reasonsSubscription = this.store.pipe(select(getFilteredReasons))
      .pipe(tap(filteredReasons => this.selectedReasons.setValue(filteredReasons)))
      .subscribe();
    this.monthSubscription = this.store.pipe(select(getFilteredMonth))
        .pipe(tap(filteredMonth => this.selectedMonth.setValue(this.months[filteredMonth - 1])))
        .subscribe();
    this.tagsSubscription = this.store.pipe(select(getFilteredTags))
          .pipe(tap(filteredTags => this.selectedTags.setValue(filteredTags)))
          .subscribe();
    this.utilizedReasons$ = this.store.pipe(select(getUtilizedReasons));
    this.utilizedMonths$ = this.store.pipe(select(getUtilizedMonths));
    this.utilizedTags$ = this.store.pipe(select(getUtilizedTags));
  }

  private initializePossibleFiltersOnce() {
    this.initializeSubscription = this.store.pipe(select(isInitialize))
      .pipe(tap(isInitialize =>  {if (isInitialize) {
        this.store.dispatch(ExpenseFilterActions.loadUtilizedValues());
      }})).subscribe();
      this.initializeSubscription.unsubscribe();
  }

  onReasonsChange(event: MatSelectChange) {
    this.store.dispatch(ExpenseFilterActions.changeReasonsFilter({reasons: this.selectedReasons.value}));
  }

  onMonthChange() {
    this.store.dispatch(ExpenseFilterActions.changeMonthFilter({month: this.months.indexOf(this.selectedMonth.value) + 1}));
  }

  onTagsChange(event: MatSelectChange) {
    this.store.dispatch(ExpenseFilterActions.changeTagsFilter({tags: this.selectedTags.value}));
  }
  
  onAdd() {
    this.store.dispatch(openAddForm());
  }

  ngOnDestroy() {
    this.reasonsSubscription.unsubscribe();
    this.monthSubscription.unsubscribe();
    this.tagsSubscription.unsubscribe();
  }
}
