import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Expense } from 'src/app/expense';
import { Tag } from 'src/app/Tag';
import { defaultExpense } from '../expense.defaultdata';
import { TAGS } from './tag.testdata';
import { Router } from '@angular/router';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

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

  actualExpense: Expense = defaultExpense;

  constructor(private router: Router) {
    this.predefinedTags = TAGS;
    this.filteredTags = this.tagControl.valueChanges.pipe(
        startWith(null),
        map((tagName: any | null) => tagName ? this._filter(tagName) : this.predefinedTags.slice()));
  }

  ngOnInit() {
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
    console.log(JSON.stringify(this.selectedTag));
    //this.router.navigate(['/expense-overview']);
  }

  resetTags() {
    this.actualExpense.tags = [];
  }
}
