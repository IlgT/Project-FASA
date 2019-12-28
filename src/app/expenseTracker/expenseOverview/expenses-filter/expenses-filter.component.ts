import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Tag } from 'src/app/Tag';
import { Observable, fromEvent } from 'rxjs';
import { debounceTime, map, startWith } from 'rxjs/operators';
import { ResponsiveDesignService } from 'src/app/responsive-design.service';

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

  constructor(public responsiveDesignService: ResponsiveDesignService) { }

  ngOnInit() { }

}
