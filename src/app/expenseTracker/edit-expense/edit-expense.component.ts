import { Component, OnInit } from '@angular/core';
import { Tag } from 'src/app/Tag';
import { TAGS } from './tag.testdata';
import { Expense } from 'src/app/expense';

@Component({
  selector: 'expensetracker-edit',
  templateUrl: './edit-expense.component.html',
  styleUrls: ['./edit-expense.component.css']
})
export class EditExpenseComponent implements OnInit {

  tags: Tag[];

  actualExpense: Expense = {
    id:null,
    reason: '',
    amount: {
      value: null,
      currency: '€'
    },
    date: null,
    tag: null
  };

  constructor() {
    this.tags = TAGS;
  }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.actualExpense);
  }
}
