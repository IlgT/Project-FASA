import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { Expense } from 'src/app/expense';
import { defaultExpense } from '../expense.defaultdata';
import { Router, ActivatedRoute } from '@angular/router';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { Store } from '@ngrx/store';
import * as fromApp from '../../stateManagement/app.reducer';
import * as ExpenseFilterActions from '../expenseOverview/expenses-filter/stateManagement/expense-filter.action';
import * as ExpenseActions from '../stateManagement/expense.action';

@Component({
  selector: 'expenseTracker-edit',
  templateUrl: './edit-expense.component.html',
  styleUrls: ['./edit-expense.component.css']
})
export class EditExpenseComponent implements OnInit, OnDestroy {
  
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagControl = new FormControl();
  filteredTags: Observable<string[]>;
  predefinedTags: string[];
  selectedTag: string = null;
  currencies: string[];

  @ViewChild('tagInput', {static: false}) tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', {static: false}) matAutocomplete: MatAutocomplete;

  title: string;
  mode: string = "";
  isEditMode: boolean;
  actualExpense: Expense;
  expenseFilterSubscription: Subscription;
  expenseSubscription: Subscription;

  constructor(private store: Store<fromApp.AppState>,
              private router: Router,
              private _snackBar: MatSnackBar) {
    this. expenseFilterSubscription = this.store.select('expenseFilter')
      .subscribe(expenseFilterState =>  {this.predefinedTags = expenseFilterState.utilizedTags;
                                        this.currencies = expenseFilterState.currencies});
    if (this.predefinedTags.length === 0) {
      this.store.dispatch(new ExpenseActions.LoadExpenseList());
      this.store.dispatch(new ExpenseFilterActions.LoadUtilizedValues());
    }
    this.filteredTags = this.tagControl.valueChanges.pipe(
        startWith(null),
        map((tagName: any | null) => tagName ? this._filter(tagName) : this.predefinedTags.slice()));
    this.actualExpense = {...defaultExpense,
                          amount: {...defaultExpense.amount},
                          exchangeValue: {...defaultExpense.exchangeValue},
                          tags: [...defaultExpense.tags]};
  }

  ngOnInit() {
    this.expenseSubscription = this.store
                                .select('expense')
                                .subscribe(expenseState => {
                                  if (expenseState.actualExpenseIndex > -1) {
                                    this.isEditMode = true;
                                    this.mode = "Überarbeiten";
                                  } else {
                                    this.isEditMode = false;
                                    this.mode = "Hinzufügen";
                                  }
                                  this.title = "Ausgabe " + this.mode;
                                  this.actualExpense = {...expenseState.actualExpense,
                                                        amount: {...expenseState.actualExpense.amount},
                                                        exchangeValue: {...expenseState.actualExpense.exchangeValue},
                                                        tags: [...expenseState.actualExpense.tags]}
                                });
  }

  add(event: MatChipInputEvent): void {
    // Add tag only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add our tag
      if ((value || '').trim()) {
        var newTag: string = value.trim();
        this.actualExpense.tags.push(newTag);
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.tagControl.setValue(null);
    }
  }

  remove(tag: string): void {
    const index = this.actualExpense.tags.indexOf(tag);

    if (index >= 0) {
      this.actualExpense.tags.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    var newTag: string = event.option.viewValue;
    this.actualExpense.tags.push(newTag);
    this.tagInput.nativeElement.value = '';
    this.tagControl.setValue(null);
  }

  private _filter(tagName: string): string[] {
    var filterValue = tagName.toLowerCase();

    return this.predefinedTags.filter(tag => tag.toLowerCase().indexOf(filterValue) === 0);
  }

  onSubmit() {
    this.closingSnackBar('submit');
    this.router.navigate(['/expenses']);
  }

  resetTags() {
    this.actualExpense.tags = [];
  }

  onReset() {
    if (this.isEditMode) {
      this.store.dispatch(new ExpenseActions.ResetModifyForm());
    } else {
      this.store.dispatch(new ExpenseActions.ResetAddForm());
    }
    this.resetingSnackBar();
  }

  resetingSnackBar() {
    this._snackBar.open('Alles wurde zurückgesetzt');
  }

  closingSnackBar(buttonType: string) {
    if (buttonType === 'cancel') {
      if (this.isEditMode) {
        this.store.dispatch(new ExpenseActions.ModifyExpenseCanceled());
      } else {
        this.store.dispatch(new ExpenseActions.AddExpenseCanceled());
      }
      this._snackBar.open(this.mode + ' wurde abgerbochen');
    } else {
      if (this.isEditMode) {
        this.store.dispatch(new ExpenseActions.ModifyExpense(this.actualExpense));
      } else {
        this.store.dispatch(new ExpenseActions.AddExpense(this.actualExpense));
      }
    }
  }

  ngOnDestroy() {
    this.expenseFilterSubscription.unsubscribe();
    this.expenseSubscription.unsubscribe();
  }
}
