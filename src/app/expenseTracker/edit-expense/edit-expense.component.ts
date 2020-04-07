import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { Observable, Subscription, of } from 'rxjs';
import { map, startWith, tap } from 'rxjs/operators';
import { MatSnackBar, MatChipInputEvent } from '@angular/material';
import { Store, select } from '@ngrx/store';
import { ExpenseActions } from '../action-types';
import { ExpenseFilterActions } from '../expenseOverview/expenses-filter/stateManagement/action-types';
import { GreaterThanZeroValidator } from 'src/app/commons/services/greaterThanZeroValidator';
import { AppState } from 'src/app/reducers/app.reducers';
import { getActualExpense, isEditMode, isLoadingExpenses } from '../expense.selectors';
import { getUtilizedTags, getCurrencies } from '../expenseOverview/expenses-filter/stateManagement/expense-filter.selectors'
import { ExpenseService } from '../services/expense-service.service';

@Component({
  selector: 'expenseTracker-edit',
  templateUrl: './edit-expense.component.html',
  styleUrls: ['./edit-expense.component.css']
})
export class EditExpenseComponent implements OnInit, OnDestroy {
  expenseForm = this.formBuilder.group({
    id: [],
    amount: this.formBuilder.group({
      value: [],
      currency: []
    }),
    reason: [null, Validators.required],
    date: [null,  Validators.required],
    originalAmount: this.formBuilder.group({
      value: [0, [Validators.required, GreaterThanZeroValidator.validateValueGreaterThanzero]],
      currency: ['EUR', Validators.required]
    }),
    exchangeRate: [],
    tags: [[]]
  });
  
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  
  filteredTags: Observable<string[]>;
  predefinedTags: string[];
  selectedTags: string[];
  currencies$: Observable<string[]>;

  @ViewChild('tagInput', {static: false}) tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', {static: false}) matAutocomplete: MatAutocomplete;

  title: string;
  mode: string = "";
  isEditMode: boolean;
  isLoading$: Observable<boolean> = of(false);
  tagsSubscription: Subscription;
  expenseSubscription: Subscription;
  isEditModeSubscription: Subscription;

  constructor(private store: Store<AppState>,
              private router: Router,
              private _snackBar: MatSnackBar,
              private formBuilder: FormBuilder,
              private expenseService: ExpenseService) {
    this.filteredTags = this.expenseForm.get('tags').valueChanges.pipe(
        startWith(null),
        map((tagName: string | null) => tagName ? this._filter(tagName) : this.predefinedTags.slice()));
  }

  ngOnInit() {
    this.tagsSubscription = this.store.pipe(select(getUtilizedTags))
      .pipe(tap(tags => this.predefinedTags = tags)).subscribe();
    this.currencies$ = this.store.pipe(select(getCurrencies)); 
    if (this.predefinedTags.length === 0) {
      this.store.dispatch(ExpenseActions.loadExpenseList());
      this.store.dispatch(ExpenseFilterActions.loadUtilizedValues());
    }
    this.expenseSubscription = this.store.pipe(
      select(getActualExpense))
      .pipe(tap(actualExpense => {this.expenseForm.patchValue(actualExpense);
                                  this.expenseForm.get('tags').setValue('');
                                  this.selectedTags = [...actualExpense.tags];}))
      .subscribe();
    this.isEditModeSubscription = this.store.pipe(select(isEditMode))
      .subscribe(isEditMode => this.isEditMode = isEditMode);
    this.isLoading$ = this.store.pipe(select(isLoadingExpenses));
    if (this.isEditMode) {
        this.mode = "Überarbeiten";
      } else {
        this.mode = "Hinzufügen";
      }
    this.title = "Ausgabe " + this.mode;
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
        this.selectedTags.push(newTag);
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.expenseForm.get('tags').setValue(null);
    }
  }

  remove(tag: string): void {
    const index = this.selectedTags.indexOf(tag);

    if (index >= 0) {
      this.selectedTags.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    var newTag: string = event.option.viewValue;
    this.selectedTags.push(newTag);
    this.tagInput.nativeElement.value = '';
    this.expenseForm.get('tags').setValue(null);
  }

  private _filter(tagName: any): string[] {
    if (tagName instanceof String) {
      var filterValue = tagName.toLowerCase();
      return this.predefinedTags.filter(tag => tag.toLowerCase().indexOf(filterValue) === 0);
    }
  }

  onSubmit() {
    var expense = {...this.expenseForm.value,
                   tags: this.selectedTags,
                   amount: {
                    ...this.expenseForm.value.amount,
                    value: null
                    },
                    exchangeRate: null};
    this.router.navigateByUrl('/expenses');
    //Ensure thate routing is happening before HTTP-Call
    setTimeout(() => {
      if (this.isEditMode) {
        if (this.expenseService.isMatchingFilters(expense)) {
          this.store.dispatch(ExpenseActions.optimisticModifyExpense({expense: {id: expense.id,
                                                                                changes: expense}}));
        } else {
          this.store.dispatch(ExpenseActions.pesimisticModifyExpense({expense: expense}));
        }
      } else {
        this.store.dispatch(ExpenseActions.addExpense({expense: expense}));
      }
    }, 0);
  }
  
  resetTags() {
    this.selectedTags = [];
  }

  onReset() {
    var id : number = null;
    if (this.isEditMode) {
      id = this.expenseForm.get('id').value;
      this.store.dispatch(ExpenseActions.resetModifyForm());
    } else {
      this.store.dispatch(ExpenseActions.resetAddForm());
    }
    this.expenseForm.reset({id: id, originalAmount: {value: 0, currency: 'EUR'}});
    this.resetingSnackBar();
  }

  resetingSnackBar() {
    this._snackBar.open('Alles wurde zurückgesetzt');
  }

  closingSnackBar(buttonType: string) {
    if (this.isEditMode) {
      this.store.dispatch(ExpenseActions.modifyExpenseCanceled());
    } else {
      this.store.dispatch(ExpenseActions.addExpenseCanceled());
    }
    this._snackBar.open(this.mode + ' wurde abgerbochen');
  }

  ngOnDestroy() {
    this.tagsSubscription.unsubscribe();
    this.expenseSubscription.unsubscribe();
    this.isEditModeSubscription.unsubscribe();
  }
}
