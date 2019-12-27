import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Expense } from 'src/app/expense';
import { Tag } from 'src/app/Tag';
import { defaultExpense } from '../expense.defaultdata';
import { TAGS } from './tag.testdata';
import { Router, ActivatedRoute } from '@angular/router';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { Store } from '@ngrx/store';
import * as fromApp from '../../stateManagement/app.reducer';
import * as ExpenseActions from '../stateManagement/expense.action';
import * as fromExpense from '../stateManagement/expense.reducer';

@Component({
  selector: 'expenseTracker-edit',
  templateUrl: './edit-expense.component.html',
  styleUrls: ['./edit-expense.component.css']
})
export class EditExpenseComponent implements OnInit {

  title: string = "Ausgabe ";
  mode: string = "";
  isEditMode: boolean = false;
  expenseState: fromExpense.ExpenseState;
  
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

  actualExpense: Expense = defaultExpense;

  constructor(private store: Store<fromApp.AppState>,
              private router: Router,
              private _snackBar: MatSnackBar) {
    this.predefinedTags = TAGS;
    this.filteredTags = this.tagControl.valueChanges.pipe(
        startWith(null),
        map((tagName: any | null) => tagName ? this._filter(tagName) : this.predefinedTags.slice()));
  }

  ngOnInit() {
    this.store.select('expense').subscribe(
      (expenseState: fromExpense.ExpenseState) => this.expenseState = expenseState);
    if (this.expenseState.actualExpenseIndex === -1) {
      this.mode = "Hinzufügen";
      this.title = this.title + this.mode;
    } else {
      this.isEditMode = true;
      this.mode = "Überarbeiten";
      this.title = this.title + this.mode;
      this.actualExpense.reason = this.expenseState.actualExpense.reason;
      this.actualExpense.amount.value = this.expenseState.actualExpense.amount.value;
      this.actualExpense.date = this.expenseState.actualExpense.date;
      this.actualExpense.tags = [...this.expenseState.actualExpense.tags];
    }
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
    console.log(JSON.stringify(this.actualExpense));
    this.router.navigate(['/expenses']);
  }

  resetTags() {
    this.actualExpense.tags = [];
  }

  resetingSnackBar() {
    this._snackBar.open('Alles wurde zurückgesetzt');
  }

  closingSnackBar(buttonType: string) {
    if (buttonType === 'cancel') {
      this._snackBar.open(this.mode + ' wurde abgerbochen');
      this.store.dispatch(new ExpenseActions.ModifyExpenseCanceled());
    } else {
      var cancledMode: string = "";
      if (this.isEditMode === false) {
        cancledMode = 'hinzugefügt';
      } else {
        cancledMode = 'überarbeitet';
      }
      this._snackBar.open('Ausgabe wurde ' + cancledMode);
    }
  }
}
