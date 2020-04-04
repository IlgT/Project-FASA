import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.css']
})
export class LoadingSpinnerComponent implements OnInit {
  color: string = "Accent";
  mode: string = "Indeterminate";

  constructor() { }

  ngOnInit() {
  }

}
