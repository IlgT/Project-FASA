import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Tag } from 'src/app/Tag';
import { Observable, fromEvent } from 'rxjs';
import { debounceTime, map, startWith } from 'rxjs/operators';
import { ResponsiveDesignService } from 'src/app/responsive-design.service';
import { Store } from '@ngrx/store';
import * as fromApp from 'src/app/stateManagement/app.reducer';
import * as fromExpense from '../../stateManagement/expense.reducer';
import * as ExpenseActions from '../../stateManagement/expense.action';
import { MatSelectChange } from '@angular/material';

@Component({
  selector: 'app-expenses-filter',
  templateUrl: './expenses-filter.component.html',
  styleUrls: ['./expenses-filter.component.css']
})
export class ExpensesFilterComponent implements OnInit {
  
  reasonsControl = new FormControl();
  monthControl = new FormControl();
  tagsControl = new FormControl();
  usedReasons: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  usedMonths: string[] = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli',
                          'August', 'September', 'Oktober', 'Novemeber', 'Dezemeber'];
  usedTags: string[] = ["Shopping"];

  selectedReasons: string[];
  selectedMonth: string;
  selectedTags: string[];

  constructor(public responsiveDesignService: ResponsiveDesignService,
              private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.store
      .select('expense')
      .subscribe((expenseState: fromExpense.ExpenseState) => {
      this.selectedMonth = this.usedMonths[expenseState.month - 1];
      this.selectedReasons = expenseState.reasons;
      this.selectedTags = expenseState.tags});
  }

  onReasonsChange(event: MatSelectChange) {
    this.store.dispatch(new ExpenseActions.ChangeReasonsFilter(this.selectedReasons));
  }

  onMonthChange() {
    this.store.dispatch(new ExpenseActions.ChangeMonthFilter(this.usedMonths.indexOf(this.selectedMonth) + 1));
  }

  onTagsChange(event: MatSelectChange) {
    this.store.dispatch(new ExpenseActions.ChangeTagsFilter(this.selectedTags));
  }
  
  onAdd() {
    this.store.dispatch(new ExpenseActions.StartAddExpense());
  }
}
