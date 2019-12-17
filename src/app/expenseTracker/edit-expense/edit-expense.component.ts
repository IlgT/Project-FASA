import { Component, OnInit } from '@angular/core';
import { Expense } from 'src/app/expense';
import { Tag } from 'src/app/Tag';
import { defaultExpense } from '../expense.defaultdata';
import { TAGS } from './tag.testdata';
import { Router } from '@angular/router';

@Component({
  selector: 'expenseTracker-edit',
  templateUrl: './edit-expense.component.html',
  styleUrls: ['./edit-expense.component.css']
})
export class EditExpenseComponent implements OnInit {

  predefinedTags: Tag[];

  actualExpense: Expense = defaultExpense;

  constructor(private router: Router) {
    this.predefinedTags = TAGS;
  }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.actualExpense);
    this.router.navigate(['/expense-overview']);
  }
}
