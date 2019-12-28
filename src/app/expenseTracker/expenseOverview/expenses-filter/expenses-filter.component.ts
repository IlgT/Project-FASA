import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Tag } from 'src/app/Tag';

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
  usedMonths: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  usedTags: Tag[] = [{id: null, name: "Shopping"}];

  constructor() { }

  ngOnInit() {
  }

}
