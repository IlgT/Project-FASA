import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Expense } from 'src/app/expense';
import { Tag } from 'src/app/Tag';
import { defaultExpense } from '../expense.defaultdata';
import { TAGS } from './tag.testdata';
import { Router, ActivatedRoute } from '@angular/router';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { Store } from '@ngrx/store';
import * as fromApp from '../../stateManagement/app.reducer';
import * as ExpenseActions from '../stateManagement/expense.action';

@Component({
  selector: 'expenseTracker-edit',
  templateUrl: './edit-expense.component.html',
  styleUrls: ['./edit-expense.component.css']
})
export class EditExpenseComponent implements OnInit {
  
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagControl = new FormControl();
  filteredTags: Observable<Tag[]>;
  predefinedTags: Tag[];
  selectedTag: Tag = null;

  @ViewChild('tagInput', {static: false}) tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', {static: false}) matAutocomplete: MatAutocomplete;

  title: string;
  mode: string = "";
  isEditMode: boolean;
  actualExpense: Expense;

  constructor(private store: Store<fromApp.AppState>,
              private router: Router,
              private _snackBar: MatSnackBar) {
    this.predefinedTags = TAGS;
    this.filteredTags = this.tagControl.valueChanges.pipe(
        startWith(null),
        map((tagName: any | null) => tagName ? this._filter(tagName) : this.predefinedTags.slice()));
    this.actualExpense = {...defaultExpense,
                          amount: {...defaultExpense.amount},
                          exchangeValue: {...defaultExpense.exchangeValue},
                          tags: [...defaultExpense.tags]};
  }

  ngOnInit() {
    this.store
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

  onTagSelection(): void {
    this.actualExpense.tags.push(this.selectedTag);
  }

  add(event: MatChipInputEvent): void {
    // Add fruit only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add our fruit
      if ((value || '').trim()) {
        var newTag: Tag = {
          id: null,
          name: value.trim()
        }
        this.actualExpense.tags.push(newTag);
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.tagControl.setValue(null);
    }
  }

  remove(tag: Tag): void {
    const index = this.actualExpense.tags.indexOf(tag);

    if (index >= 0) {
      this.actualExpense.tags.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    var newTag: Tag = {
      id: null,
      name: event.option.viewValue
    }
    this.actualExpense.tags.push(newTag);
    this.tagInput.nativeElement.value = '';
    this.tagControl.setValue(null);
  }

  private _filter(tagName: any): Tag[] {
    var filterValue= "";
    if (typeof tagName == "string") {
      filterValue = tagName.toLowerCase();
    } else {
      filterValue = tagName.name.toLowerCase();
    }

    return this.predefinedTags.filter(tag => tag.name.toLowerCase().indexOf(filterValue) === 0);
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
      var cancledMode: string = "";
      if (this.isEditMode) {
        this.store.dispatch(new ExpenseActions.ModifyExpense(this.actualExpense));
        cancledMode = 'überarbeitet';
      } else {
        this.store.dispatch(new ExpenseActions.AddExpense(this.actualExpense));
        cancledMode = 'hinzugefügt';
      }
      this._snackBar.open('Ausgabe wurde ' + cancledMode);
    }
  }
}
